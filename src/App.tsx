import DeckGL from '@deck.gl/react';
import StaticMap from 'react-map-gl';
import { useEffect, useRef, useState } from 'react';
import { GeoJsonLayer } from '@deck.gl/layers';
import type { FeatureCollection, Polygon } from 'geojson';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const INITIAL_VIEW_STATE = {
  latitude: 35.658,
  longitude: 139.744,
  zoom: 18,
  pitch: 60,
  bearing: -20,
};

// 屋上ポリゴンのプロパティ型
interface RooftopProperties {
  title: string;
  image: string;
  description: string;
}

// ダミー屋上ポリゴンGeoJSON（東京タワー周辺に3つ、各ビルに画像・説明付き）
const rooftopsGeojson: FeatureCollection<Polygon, RooftopProperties> = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        title: '東京都 街角緑化支援',
        image:
          'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80',
        description: '詳細はこちら',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [139.744, 35.658],
            [139.744, 35.6585],
            [139.7445, 35.6585],
            [139.7445, 35.658],
            [139.744, 35.658],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        title: '港区 屋上緑化プロジェクト',
        image:
          'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=200&q=80',
        description: '緑化の詳細',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [139.743, 35.6582],
            [139.743, 35.6587],
            [139.7435, 35.6587],
            [139.7435, 35.6582],
            [139.743, 35.6582],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        title: '芝公園 屋上菜園',
        image:
          'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=200&q=80',
        description: '菜園の詳細',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [139.742, 35.6584],
            [139.742, 35.6589],
            [139.7425, 35.6589],
            [139.7425, 35.6584],
            [139.742, 35.6584],
          ],
        ],
      },
    },
  ],
};

// 吹き出しUI用の型
type RooftopPopupInfo =
  | (RooftopProperties & { coordinates: [number, number] })
  | null;

function App() {
  const [viewState, setViewState] =
    useState<typeof INITIAL_VIEW_STATE>(INITIAL_VIEW_STATE);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [popupInfo, setPopupInfo] = useState<RooftopPopupInfo>(null);

  // 屋上ポリゴンをクリックで吹き出し表示
  const rooftopLayer = new GeoJsonLayer({
    id: 'rooftop-demo',
    data: rooftopsGeojson,
    getFillColor: (f) =>
      f.properties?.title ? [255, 0, 0, 180] : [0, 0, 255, 180],
    extruded: true,
    getElevation: 10,
    pickable: true,
    onClick: (info) => {
      // info.object: Feature<Polygon, RooftopProperties> | undefined
      if (info.object && info.coordinate) {
        setPopupInfo({
          title: info.object.properties.title,
          image: info.object.properties.image,
          description: info.object.properties.description,
          coordinates: info.coordinate as [number, number],
        });
      } else {
        setPopupInfo(null);
      }
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const map = mapRef.current;
      if (!map) return;
      if (map.isStyleLoaded()) {
        if (!map.getLayer('3d-buildings')) {
          map.addLayer({
            id: '3d-buildings',
            source: 'composite',
            'source-layer': 'building',
            filter: ['==', 'extrude', 'true'],
            type: 'fill-extrusion',
            minzoom: 15,
            paint: {
              'fill-extrusion-color': '#aaa',
              'fill-extrusion-height': ['get', 'height'],
              'fill-extrusion-base': ['get', 'min_height'],
              'fill-extrusion-opacity': 0.7,
            },
          });
        }
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // 地理座標→画面座標変換
  function getPopupPosition(coordinate: [number, number] | undefined) {
    if (!mapRef.current || !coordinate) return { left: 0, top: 0 };
    const canvas = mapRef.current.getCanvas();
    const rect = canvas.getBoundingClientRect();
    // mapbox-glのprojectで地理座標→ピクセル座標
    const point = mapRef.current.project([coordinate[0], coordinate[1]]);
    return {
      left: point.x + rect.left,
      top: point.y + rect.top - 120, // 少し上にずらす
    };
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <DeckGL
        initialViewState={viewState}
        controller={true}
        onViewStateChange={({ viewState }) =>
          setViewState(viewState as typeof INITIAL_VIEW_STATE)
        }
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
        }}
        layers={[rooftopLayer]}
      >
        <StaticMap
          mapboxAccessToken={MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          ref={(ref) => {
            mapRef.current = ref?.getMap?.() ?? null;
          }}
        />
      </DeckGL>

      {/* 🎮 コントロールボタン群 */}
      <div
        style={{
          position: 'absolute',
          right: 10,
          bottom: 10,
          zIndex: 10, // ← 念のため DeckGL より上に
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          background: 'rgba(255, 255, 255, 0.8)', // ← 背景つけると見やすい
          padding: '8px',
          borderRadius: '8px',
        }}
      >
        <button
          onClick={() => setViewState((v) => ({ ...v, zoom: v.zoom + 1 }))}
        >
          ＋
        </button>
        <button
          onClick={() => setViewState((v) => ({ ...v, zoom: v.zoom - 1 }))}
        >
          －
        </button>
        <button onClick={() => setViewState(INITIAL_VIEW_STATE)}>⟳</button>
        <button
          onClick={() =>
            setViewState((v) => ({ ...v, bearing: v.bearing - 10 }))
          }
        >
          ⟲ 左回転
        </button>
        <button
          onClick={() =>
            setViewState((v) => ({ ...v, bearing: v.bearing + 10 }))
          }
        >
          右回転 ⟳
        </button>
        <button
          onClick={() =>
            setViewState((v) => ({ ...v, pitch: Math.max(0, v.pitch - 10) }))
          }
        >
          ⤒ 角度↑
        </button>
        <button
          onClick={() =>
            setViewState((v) => ({ ...v, pitch: Math.min(85, v.pitch + 10) }))
          }
        >
          ⤓ 角度↓
        </button>
      </div>
      {/* 吹き出しUI */}
      {popupInfo && (
        <div
          style={{
            position: 'absolute',
            left: getPopupPosition(popupInfo.coordinates).left,
            top: getPopupPosition(popupInfo.coordinates).top,
            zIndex: 20,
            background: '#ffe4e1',
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            padding: 12,
            minWidth: 180,
            pointerEvents: 'auto',
          }}
        >
          <div style={{ fontWeight: 'bold', marginBottom: 4 }}>
            {popupInfo.title}
          </div>
          <img
            src={popupInfo.image}
            alt=""
            style={{ width: 120, borderRadius: 4, marginBottom: 4 }}
          />
          <div>{popupInfo.description}</div>
          <button style={{ marginTop: 8 }} onClick={() => setPopupInfo(null)}>
            閉じる
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

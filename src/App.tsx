import DeckGL from '@deck.gl/react';
import StaticMap from 'react-map-gl';
import { useEffect, useRef, useState } from 'react';
import { GeoJsonLayer } from '@deck.gl/layers';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const INITIAL_VIEW_STATE = {
  latitude: 35.607768,
  longitude: 139.742327,
  zoom: 16,
  pitch: 60,
  bearing: -20,
};

// ダミー屋上ポリゴンGeoJSON（東京タワー周辺に3つ）
const rooftopsGeojson: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
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
      properties: {},
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
      properties: {},
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

function App() {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  // 屋上ポリゴンをランダム色で塗るGeoJsonLayer
  const rooftopLayer = new GeoJsonLayer({
    id: 'rooftop-demo',
    data: rooftopsGeojson,
    getFillColor: () => {
      // ランダム色（赤or青）
      return Math.random() > 0.5 ? [255, 0, 0, 180] : [0, 0, 255, 180];
    },
    extruded: true,
    getElevation: 10,
    pickable: true,
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
          mapStyle="mapbox://styles/mapbox/light-v11"
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
    </div>
  );
}

export default App;

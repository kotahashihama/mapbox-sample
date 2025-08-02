import DeckGL from '@deck.gl/react';
import StaticMap from 'react-map-gl';
import type { MapRef } from 'react-map-gl';
import { useEffect, useRef, useState } from 'react';
import type { ViewStateChangeParameters } from '@deck.gl/core';
import type { PopupInfo, ViewState } from './types';
import { MAPBOX_TOKEN, INITIAL_VIEW_STATE } from './constants';
import { createGeoJsonBuildingLayer } from './layers/geoJsonBuildingLayer';
import { createMvtBuildingLayer } from './layers/mvtBuildingLayer';
import { createTreeLayer } from './layers/treeLayer';
import { Popup } from './components/Popup/Popup';
import { Controls } from './components/Controls/Controls';
import { LayerToggle } from './components/LayerToggle/LayerToggle';
import * as style from './App.css';

/**
 * メインアプリケーションコンポーネント
 * 
 * 都市緑化ポテンシャル可視化システムのプロトタイプ
 * Mapbox と Deck.gl を組み合わせた 3D 地図表示を管理
 * GeoJSON、MVT、.glb 形式のデータ表示を検証
 */
function App() {
  // Mapbox と Deck.gl を組み合わせた 3D 地図の表示状態を管理
  const [viewState, setViewState] = useState<ViewState>(INITIAL_VIEW_STATE);
  const mapRef = useRef<MapRef | null>(null);
  // 建物クリック時のポップアップ情報を管理（Feature ID による建物データの紐付けを実現）
  const [popupInfo, setPopupInfo] = useState<PopupInfo>(null);
  // 建物データの表示切り替え（配信形式の比較検証用）
  const [showMvt, setShowMvt] = useState(true);     // MVT 形式（差分読み込み）
  const [showGeoJson, setShowGeoJson] = useState(true);  // GeoJSON 形式（一括読み込み）

  // 各種レイヤーを作成（建物データの配信形式比較）
  const geoJsonBuildingLayer = createGeoJsonBuildingLayer(setPopupInfo);  // GeoJSON 形式：小規模データ向け
  const mvtBuildingLayer = createMvtBuildingLayer(setPopupInfo);      // MVT 形式：大規模データ向け
  // ScenegraphLayer: 既存緑化エリアを表現する 3D 樹木モデル (.glb)
  const treeModelLayer = createTreeLayer(setPopupInfo);

  // Mapbox 3D 建物レイヤーを追加
  // Mapbox Standard の建物ベクタータイルを利用して 3D の建物を表示
  // これにより Feature ID を通じた建物データの紐付けが可能になる
  useEffect(() => {
    const interval = setInterval(() => {
      const map = mapRef.current?.getMap();
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
              // 建物の高さ情報を Feature のプロパティから取得
              'fill-extrusion-height': ['get', 'height'],
              'fill-extrusion-base': ['get', 'min_height'],
              // 半透明にして Deck.gl のレイヤーと重ね合わせ可能に
              'fill-extrusion-opacity': 0.7,
            },
          });
        }
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  /**
   * 地理座標→画面座標変換
   * 
   * クリックした建物の座標をポップアップ表示位置に変換
   * Feature ID で特定した建物の緯度経度を画面上の位置に変換する
   */
  function getPopupPosition(coordinate: [number, number] | undefined) {
    const map = mapRef.current?.getMap();
    if (!map || !coordinate) return { left: 0, top: 0 };
    const canvas = map.getCanvas();
    const rect = canvas.getBoundingClientRect();
    const point = map.project([coordinate[0], coordinate[1]]);
    return {
      left: point.x + rect.left,
      top: point.y + rect.top - 120,
    };
  }

  // DeckGL の onViewStateChange ハンドラ
  // 地図の表示状態（ズーム、回転、傾き）を管理
  const handleViewStateChange = ({ viewState }: ViewStateChangeParameters) => {
    if ('latitude' in viewState && 
        'longitude' in viewState && 
        'zoom' in viewState && 
        'pitch' in viewState && 
        'bearing' in viewState) {
      setViewState({
        latitude: viewState.latitude,
        longitude: viewState.longitude,
        zoom: viewState.zoom,
        pitch: viewState.pitch,
        bearing: viewState.bearing,
      });
    }
  };

  return (
    <div className={style.appContainer}>
      <DeckGL
        initialViewState={viewState}
        controller={true}
        onViewStateChange={handleViewStateChange}
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
        }}
        layers={[
          // 建物データ（MVT 形式：タイル単位の差分読み込み）
          showMvt ? mvtBuildingLayer : null,
          // 建物データ（GeoJSON 形式：ファイル全体の一括読み込み）
          showGeoJson ? geoJsonBuildingLayer : null,
          // ScenegraphLayer: 既存緑化エリアの 3D 樹木モデル (.glb)
          treeModelLayer,
        ].filter(Boolean)}
      >
        <StaticMap
          ref={mapRef}
          mapboxAccessToken={MAPBOX_TOKEN}
          // Mapbox Standard スタイル（日照シミュレーションの 4 プリセット対応）
          // dawn, day, dusk, night のライティング切り替えが可能
          mapStyle="mapbox://styles/mapbox/streets-v11"
        />
      </DeckGL>

      <LayerToggle
        showMvt={showMvt}
        setShowMvt={setShowMvt}
        showGeoJson={showGeoJson}
        setShowGeoJson={setShowGeoJson}
      />

      <Controls
        setViewState={setViewState}
        initialViewState={INITIAL_VIEW_STATE}
      />

      <Popup
        popupInfo={popupInfo}
        getPopupPosition={getPopupPosition}
        onClose={() => setPopupInfo(null)}
      />
    </div>
  );
}

export default App;
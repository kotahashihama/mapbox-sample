import DeckGL from '@deck.gl/react';
import StaticMap from 'react-map-gl';
import type { MapRef } from 'react-map-gl';
import { useEffect, useRef, useState } from 'react';
import type { ViewStateChangeParameters } from '@deck.gl/core';
import type { PopupInfo, ViewState } from './types';
import { MAPBOX_TOKEN, INITIAL_VIEW_STATE } from './constants';
import { createRooftopLayer } from './layers/rooftopLayer';
import { createBuildingLayer } from './layers/buildingLayer';
import { createTreeLayer } from './layers/treeLayer';
import { Popup } from './components/Popup/Popup';
import { Controls } from './components/Controls/Controls';
import { LayerToggle } from './components/LayerToggle/LayerToggle';

function App() {
  const [viewState, setViewState] = useState<ViewState>(INITIAL_VIEW_STATE);
  const mapRef = useRef<MapRef | null>(null);
  const [popupInfo, setPopupInfo] = useState<PopupInfo>(null);
  const [showMvt, setShowMvt] = useState(true);
  const [showRooftop, setShowRooftop] = useState(true);

  // レイヤーを作成
  const rooftopLayer = createRooftopLayer(setPopupInfo);
  const mvtLayer = createBuildingLayer(setPopupInfo);
  const treeModelLayer = createTreeLayer(setPopupInfo);

  // Mapbox 3Dビルディングレイヤーを追加
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

  // DeckGLのonViewStateChangeハンドラ
  const handleViewStateChange = ({ viewState }: ViewStateChangeParameters) => {
    // MapViewStateまたはTransitionPropsから必要なプロパティを取得
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
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
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
          showMvt ? mvtLayer : null,
          showRooftop ? rooftopLayer : null,
          treeModelLayer,
        ].filter(Boolean)}
      >
        <StaticMap
          ref={mapRef}
          mapboxAccessToken={MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        />
      </DeckGL>

      <LayerToggle
        showMvt={showMvt}
        setShowMvt={setShowMvt}
        showRooftop={showRooftop}
        setShowRooftop={setShowRooftop}
      />

      <Controls
        viewState={viewState}
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
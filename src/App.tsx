import DeckGL from '@deck.gl/react';
import StaticMap from 'react-map-gl';
import { useState } from 'react';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const INITIAL_VIEW_STATE = {
  longitude: 139.6917, // 東京都の経度
  latitude: 35.6895, // 東京都の緯度
  zoom: 10,
  pitch: 60,
  bearing: -20,
};

const CONTROLLER = {
  dragRotate: true,
  touchRotate: true,
  dragPan: true,
  scrollZoom: true,
  doubleClickZoom: true,
  minZoom: 0,
  maxZoom: 20,
};

function App() {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <DeckGL
        initialViewState={viewState}
        controller={CONTROLLER}
        onViewStateChange={({ viewState }) =>
          setViewState(viewState as typeof INITIAL_VIEW_STATE)
        }
        style={{ width: '100vw', height: '100vh' }}
      >
        <StaticMap
          mapboxAccessToken={MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/light-v11"
        />
      </DeckGL>
      {/* 自作コントロール */}
      <div
        style={{
          position: 'absolute',
          right: 10,
          bottom: 10,
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
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

import DeckGL from '@deck.gl/react';
import StaticMap from 'react-map-gl';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const INITIAL_VIEW_STATE = {
  longitude: 139.6917, // 東京都の経度
  latitude: 35.6895, // 東京都の緯度
  zoom: 10,
  pitch: 60,
  bearing: -20,
};

function App() {
  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      style={{ width: '100vw', height: '100vh' }}
    >
      <StaticMap
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/light-v11"
      />
    </DeckGL>
  );
}

export default App;

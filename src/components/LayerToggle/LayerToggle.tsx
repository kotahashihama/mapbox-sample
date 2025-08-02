interface LayerToggleProps {
  showMvt: boolean;
  setShowMvt: (show: boolean) => void;
  showRooftop: boolean;
  setShowRooftop: (show: boolean) => void;
}

export function LayerToggle({
  showMvt,
  setShowMvt,
  showRooftop,
  setShowRooftop,
}: LayerToggleProps) {
  return (
    <div
      style={{
        position: 'absolute',
        right: 10,
        top: 10,
        zIndex: 11,
        background: 'rgba(255,255,255,0.9)',
        padding: '8px 12px',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        fontSize: 14,
      }}
    >
      <div style={{ marginBottom: 4, fontWeight: 'bold' }}>レイヤー表示</div>
      <label style={{ display: 'block', marginBottom: 4 }}>
        <input
          type="checkbox"
          checked={showMvt}
          onChange={(e) => setShowMvt(e.target.checked)}
        />{' '}
        VectorTileビル
      </label>
      <label style={{ display: 'block', marginBottom: 4 }}>
        <input
          type="checkbox"
          checked={showRooftop}
          onChange={(e) => setShowRooftop(e.target.checked)}
        />{' '}
        GeoJSONビル
      </label>
    </div>
  );
}
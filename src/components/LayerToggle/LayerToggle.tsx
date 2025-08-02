import * as style from './LayerToggle.css';

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
    <div className={style.toggleContainer}>
      <div className={style.toggleTitle}>レイヤー表示</div>
      <label className={style.toggleLabel}>
        <input
          className={style.toggleCheckbox}
          type="checkbox"
          checked={showMvt}
          onChange={(e) => setShowMvt(e.target.checked)}
        />
        VectorTileビル
      </label>
      <label className={style.toggleLabel}>
        <input
          className={style.toggleCheckbox}
          type="checkbox"
          checked={showRooftop}
          onChange={(e) => setShowRooftop(e.target.checked)}
        />
        GeoJSONビル
      </label>
    </div>
  );
}
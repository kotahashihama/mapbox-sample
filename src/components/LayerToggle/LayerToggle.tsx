import * as style from './LayerToggle.css';

/**
 * LayerToggle コンポーネントの props
 */
interface LayerToggleProps {
  showMvt: boolean;
  setShowMvt: (show: boolean) => void;
  showGeoJson: boolean;
  setShowGeoJson: (show: boolean) => void;
}

/**
 * レイヤーの表示/非表示を切り替えるトグル
 * 
 * 建物データの配信形式（MVT vs GeoJSON）の比較検証用
 */
export function LayerToggle({
  showMvt,
  setShowMvt,
  showGeoJson,
  setShowGeoJson,
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
建物 (MVT 形式)
      </label>
      <label className={style.toggleLabel}>
        <input
          className={style.toggleCheckbox}
          type="checkbox"
          checked={showGeoJson}
          onChange={(e) => setShowGeoJson(e.target.checked)}
        />
        建物 (GeoJSON 形式)
      </label>
    </div>
  );
}
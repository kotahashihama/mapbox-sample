import type { PopupInfo } from '../../types';
import * as style from './Popup.css';

/**
 * Popup コンポーネントの props
 */
interface PopupProps {
  popupInfo: PopupInfo;
  getPopupPosition: (coordinate: [number, number] | undefined) => { left: number; top: number };
  onClose: () => void;
}

/**
 * 建物クリック時のポップアップ表示
 * 
 * Feature ID を通じて建物固有の緑化ポテンシャル情報を表示
 */
export function Popup({ popupInfo, getPopupPosition, onClose }: PopupProps) {
  if (!popupInfo) return null;

  return (
    <div
      className={style.popupStyle}
      style={{
        left: getPopupPosition(popupInfo.coordinates).left,
        top: getPopupPosition(popupInfo.coordinates).top,
      }}
    >
      <div className={style.popupTitle}>{popupInfo.title}</div>
      {popupInfo.image && (
        <img src={popupInfo.image} alt="" className={style.popupImage} />
      )}
      {/* Feature オブジェクトのプロパティを表形式で表示
          将来的には日射量、耐荷重、適性植物などの情報を表示 */}
      {typeof popupInfo.description === 'object' &&
      popupInfo.description !== null ? (
        <table className={style.popupTable}>
          <tbody>
            {Object.entries(popupInfo.description).map(([key, value]) => (
              <tr key={key}>
                <td className={style.popupTableKey}>{key}</td>
                <td>{String(value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>{popupInfo.description}</div>
      )}
      <button className={style.popupCloseButton} onClick={onClose}>
        閉じる
      </button>
    </div>
  );
}
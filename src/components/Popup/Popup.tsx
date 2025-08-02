import type { PopupInfo } from '../../types';
import * as style from './Popup.css';

interface PopupProps {
  popupInfo: PopupInfo;
  getPopupPosition: (coordinate: [number, number] | undefined) => { left: number; top: number };
  onClose: () => void;
}

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
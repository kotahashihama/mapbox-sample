import type { PopupInfo } from '../../types';
import {
  popupStyle,
  popupTitle,
  popupImage,
  popupTable,
  popupTableKey,
  popupCloseButton,
} from './Popup.css';

interface PopupProps {
  popupInfo: PopupInfo;
  getPopupPosition: (coordinate: [number, number] | undefined) => { left: number; top: number };
  onClose: () => void;
}

export function Popup({ popupInfo, getPopupPosition, onClose }: PopupProps) {
  if (!popupInfo) return null;

  return (
    <div
      className={popupStyle}
      style={{
        left: getPopupPosition(popupInfo.coordinates).left,
        top: getPopupPosition(popupInfo.coordinates).top,
      }}
    >
      <div className={popupTitle}>{popupInfo.title}</div>
      {popupInfo.image && (
        <img src={popupInfo.image} alt="" className={popupImage} />
      )}
      {typeof popupInfo.description === 'object' &&
      popupInfo.description !== null ? (
        <table className={popupTable}>
          <tbody>
            {Object.entries(popupInfo.description).map(([key, value]) => (
              <tr key={key}>
                <td className={popupTableKey}>{key}</td>
                <td>{String(value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>{popupInfo.description}</div>
      )}
      <button className={popupCloseButton} onClick={onClose}>
        閉じる
      </button>
    </div>
  );
}
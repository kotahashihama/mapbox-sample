import type { ViewState } from '../../types';
import * as style from './Controls.css';

interface ControlsProps {
  viewState: ViewState;
  setViewState: React.Dispatch<React.SetStateAction<ViewState>>;
  initialViewState: ViewState;
}

export function Controls({ setViewState, initialViewState }: ControlsProps) {
  return (
    <div className={style.controlsContainer}>
      <button
        className={style.controlButton}
        onClick={() => setViewState((v) => ({ ...v, zoom: v.zoom + 1 }))}
      >
        ＋
      </button>
      <button
        className={style.controlButton}
        onClick={() => setViewState((v) => ({ ...v, zoom: v.zoom - 1 }))}
      >
        －
      </button>
      <button 
        className={style.controlButton}
        onClick={() => setViewState(initialViewState)}
      >
        ⟳
      </button>
      <button
        className={style.controlButton}
        onClick={() =>
          setViewState((v) => ({ ...v, bearing: v.bearing - 10 }))
        }
      >
        ⟲ 左回転
      </button>
      <button
        className={style.controlButton}
        onClick={() =>
          setViewState((v) => ({ ...v, bearing: v.bearing + 10 }))
        }
      >
        右回転 ⟳
      </button>
      <button
        className={style.controlButton}
        onClick={() =>
          setViewState((v) => ({ ...v, pitch: Math.max(0, v.pitch - 10) }))
        }
      >
        ⤒ 角度↑
      </button>
      <button
        className={style.controlButton}
        onClick={() =>
          setViewState((v) => ({ ...v, pitch: Math.min(85, v.pitch + 10) }))
        }
      >
        ⤓ 角度↓
      </button>
    </div>
  );
}
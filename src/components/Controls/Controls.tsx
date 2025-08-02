import type { ViewState } from '../../types';

interface ControlsProps {
  viewState: ViewState;
  setViewState: React.Dispatch<React.SetStateAction<ViewState>>;
  initialViewState: ViewState;
}

export function Controls({ setViewState, initialViewState }: ControlsProps) {
  return (
    <div
      style={{
        position: 'absolute',
        right: 10,
        bottom: 10,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        background: 'rgba(255, 255, 255, 0.8)',
        padding: '8px',
        borderRadius: '8px',
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
      <button onClick={() => setViewState(initialViewState)}>⟳</button>
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
  );
}
import { ScenegraphLayer } from '@deck.gl/mesh-layers';
import type { PopupInfo } from '../types';

export function createTreeLayer(
  setPopupInfo: (info: PopupInfo) => void
) {
  return new ScenegraphLayer({
    id: 'tree-glb-single',
    data: [{ position: [139.7450223163875, 35.65895642091729, 6] }],
    scenegraph: '/tree.glb',
    getPosition: (d: { position: [number, number, number] }) => d.position,
    getOrientation: () => [0, 0, 90],
    sizeScale: 5,
    _lighting: 'pbr',
    pickable: true,
    onClick: (info) => {
      if (info.object && info.coordinate) {
        setPopupInfo({
          title: 'MITAGARDENHILLSの木',
          image: '',
          description: 'これはサンプルの木です。',
          coordinates: info.coordinate as [number, number],
        });
      }
    },
  });
}
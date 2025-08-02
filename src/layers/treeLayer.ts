import { ScenegraphLayer } from '@deck.gl/mesh-layers';
import type { PopupInfo } from '../types';

/**
 * ScenegraphLayer を使用した 3D 樹木モデルの配置
 * 
 * Blender の Python スクリプティングで作成した .glb ファイルを使用
 * 大規模展開時には .b3dm (Tile3DLayer) への移行を検討
 */
export function createTreeLayer(
  setPopupInfo: (info: PopupInfo) => void
) {
  return new ScenegraphLayer({
    id: 'tree-model-layer',
    // 東京タワー近辺の建物にテスト配置
    data: [{ position: [139.7450223163875, 35.65895642091729, 6] }],
    // Blender で作成した円錐（幹）と球体（葉）を組み合わせた樹木モデル
    scenegraph: '/tree.glb',
    getPosition: (d: { position: [number, number, number] }) => d.position,
    // 3D モデルの回転角度（Z軸を 90 度回転）
    getOrientation: () => [0, 0, 90],
    // モデルの表示サイズを調整
    sizeScale: 5,
    // PBR (Physically Based Rendering) ライティングを適用
    _lighting: 'pbr',
    pickable: true,
    onClick: (info) => {
      if (info.object && info.coordinate && info.coordinate.length >= 2) {
        // 植樹済みエリアの情報を表示
        // 将来的には植物の種類、成長状態、CO2吸収量などを表示
        setPopupInfo({
          title: 'MITAGARDENHILLSの木',
          image: '',
          description: 'これはサンプルの木です。',
          coordinates: [info.coordinate[0], info.coordinate[1]],
        });
      }
    },
  });
}
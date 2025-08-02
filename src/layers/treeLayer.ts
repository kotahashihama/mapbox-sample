import { ScenegraphLayer } from '@deck.gl/mesh-layers';
import type { PopupInfo } from '../types';

/**
 * 既存緑化エリアの 3D 樹木モデル配置
 * 
 * すでに緑化されているエリアを表現するための 3D モデル
 * Blender の Python スクリプティングで作成した .glb ファイルを使用
 * 大規模展開時には .b3dm (Tile3DLayer) への移行を検討
 */
export function createTreeLayer(
  setPopupInfo: (info: PopupInfo) => void
) {
  return new ScenegraphLayer({
    id: 'tree-model-layer',
    // 東京タワー近辺の既存緑化エリアに配置
    data: [{ position: [139.7450223163875, 35.65895642091729, 6] }],
    // Blender で作成した円錐（幹）と球体（葉）を組み合わせた樹木モデル
    scenegraph: '/tree.glb',
    getPosition: (d: { position: [number, number, number] }) => d.position,
    // 3D モデルの回転角度（Z 軸を 90 度回転）
    getOrientation: () => [0, 0, 90],
    // モデルの表示サイズを調整
    sizeScale: 5,
    // PBR (Physically Based Rendering) ライティングを適用
    _lighting: 'pbr',
    pickable: true,
    onClick: (info) => {
      if (info.object && info.coordinate && info.coordinate.length >= 2) {
        // 既存緑化エリアの情報を表示
        // 本実装では植物の種類、成長状態、CO2 吸収量などを表示することを想定
        setPopupInfo({
          title: '既存緑化エリア',
          image: '',
          description: 'これはサンプルの木です。',
          coordinates: [info.coordinate[0], info.coordinate[1]],
        });
      }
    },
  });
}
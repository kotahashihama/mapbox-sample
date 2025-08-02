import { GeoJsonLayer } from '@deck.gl/layers';
import { buildingsGeojson } from '../data/buildings';
import type { PopupInfo } from '../types';

/**
 * GeoJSON 形式を使用した建物データの表示
 * 
 * ファイル全体を一度に読み込み、小規模データに適している
 * MVT との比較検証用として実装
 */
export function createGeoJsonBuildingLayer(
  setPopupInfo: (info: PopupInfo) => void
) {
  return new GeoJsonLayer({
    id: 'geojson-building-layer',
    data: buildingsGeojson,
    // 建物の種別によって色分け
    getFillColor: (f) =>
      f.properties?.title ? [255, 0, 0, 180] : [0, 0, 255, 180],
    // 3D 表示で建物を可視化
    extruded: true,
    getElevation: 10,
    pickable: true,
    onClick: (info) => {
      if (info.object && info.coordinate && info.coordinate.length >= 2) {
        // GeoJSON 形式の建物データ情報をポップアップに表示
        // 本実装では MVT と同様に都市緑化ポテンシャル情報を表示することを想定
        setPopupInfo({
          title: `${info.object.properties.title} (GeoJSON 形式)`,
          image: info.object.properties.image,
          description: info.object.properties.description,
          coordinates: [info.coordinate[0], info.coordinate[1]],
        });
      } else {
        setPopupInfo(null);
      }
    },
  });
}
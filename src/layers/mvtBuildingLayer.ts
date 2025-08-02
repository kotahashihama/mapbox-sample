import { MVTLayer } from '@deck.gl/geo-layers';
import type { MVTBuildingProperties, PopupInfo } from '../types';
import { MAPBOX_TOKEN } from '../constants';

/**
 * MVT (Mapbox Vector Tiles) 形式を使用した建物データの表示
 * 
 * ズームレベルに応じたタイル単位の差分読み込み (.pbf)
 * 大規模データに適しており、パフォーマンスが高い
 * GeoJSON との比較検証用として実装
 */
export function createMvtBuildingLayer(
  setPopupInfo: (info: PopupInfo) => void
) {
  return new MVTLayer<MVTBuildingProperties>({
    id: 'mvt-building-layer',
    // Mapbox Vector Tiles (.pbf) のURL
    // ズームレベル (z) 、タイル座標 (x, y) に応じて必要なタイルのみを取得
    data: `https://api.mapbox.com/v4/mapbox.mapbox-streets-v8/{z}/{x}/{y}.vector.pbf?access_token=${MAPBOX_TOKEN}`,
    minZoom: 14,
    maxZoom: 20,
    getLineColor: [0, 0, 0, 80],
    getFillColor: [0, 200, 255, 120],
    lineWidthMinPixels: 1,
    pickable: true,
    getText: (f: { properties: MVTBuildingProperties }) =>
      String(f.properties.id || ''),
    getTextSize: 14,
    getTextColor: [0, 0, 0, 255],
    getTextAnchor: 'middle',
    getTextAlignmentBaseline: 'center',
    onClick: (info) => {
      if (info.object && info.coordinate && info.coordinate.length >= 2) {
        const props = { ...info.object.properties };
        // Feature オブジェクトの ID を取得
        // この ID を使って建物ごとの緑化ポテンシャルデータを紐付け可能
        if (info.object.id !== undefined) {
          props.id = info.object.id;
        }
        // クリック位置の座標を記録（衛星画像解析データとの連携用）
        props.longitude = info.coordinate[0];
        props.latitude = info.coordinate[1];
        setPopupInfo({
          title: '建物 (MVT形式)',
          image: '',
          description: props,
          coordinates: [info.coordinate[0], info.coordinate[1]],
        });
      }
    },
  });
}
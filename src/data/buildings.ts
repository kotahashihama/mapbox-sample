import type { FeatureCollection, Polygon } from 'geojson';

/**
 * GeoJSON 建物データのプロパティ
 */
interface GeoJsonBuildingProperties {
  title: string;
  image: string;
  description: string;
}

/**
 * 建物のサンプルデータ (GeoJSON 形式)
 * 
 * ファイル全体を一度に読み込むため、小規模データ（数百件程度）に適している
 * MVT 形式との比較検証用に使用
 */
export const buildingsGeojson: FeatureCollection<Polygon, GeoJsonBuildingProperties> = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        title: '建物A',
        image:
          'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80',
        // 本実装では都市緑化ポテンシャル情報を含むことを想定
        description: '東京タワー近辺の建物',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [139.744, 35.658],
            [139.744, 35.6585],
            [139.7445, 35.6585],
            [139.7445, 35.658],
            [139.744, 35.658],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        title: '建物B',
        image:
          'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=200&q=80',
        description: '東京タワー近辺の建物',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [139.743, 35.6582],
            [139.743, 35.6587],
            [139.7435, 35.6587],
            [139.7435, 35.6582],
            [139.743, 35.6582],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        title: '建物C',
        image:
          'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=200&q=80',
        description: '東京タワー近辺の建物',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [139.742, 35.6584],
            [139.742, 35.6589],
            [139.7425, 35.6589],
            [139.7425, 35.6584],
            [139.742, 35.6584],
          ],
        ],
      },
    },
  ],
};
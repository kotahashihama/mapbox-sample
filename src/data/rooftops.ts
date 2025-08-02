import type { FeatureCollection, Polygon } from 'geojson';

interface RooftopProperties {
  title: string;
  image: string;
  description: string;
}

export const rooftopsGeojson: FeatureCollection<Polygon, RooftopProperties> = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        title: '東京都 街角緑化支援',
        image:
          'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80',
        description: '詳細はこちら',
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
        title: '港区 屋上緑化プロジェクト',
        image:
          'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=200&q=80',
        description: '緑化の詳細',
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
        title: '芝公園 屋上菜園',
        image:
          'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=200&q=80',
        description: '菜園の詳細',
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
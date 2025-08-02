import { GeoJsonLayer } from '@deck.gl/layers';
import { rooftopsGeojson } from '../data/rooftops';
import type { PopupInfo } from '../types';

export function createRooftopLayer(
  setPopupInfo: (info: PopupInfo) => void
) {
  return new GeoJsonLayer({
    id: 'rooftop-demo',
    data: rooftopsGeojson,
    getFillColor: (f) =>
      f.properties?.title ? [255, 0, 0, 180] : [0, 0, 255, 180],
    extruded: true,
    getElevation: 10,
    pickable: true,
    onClick: (info) => {
      if (info.object && info.coordinate && info.coordinate.length >= 2) {
        setPopupInfo({
          title: info.object.properties.title,
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
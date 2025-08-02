import { MVTLayer } from '@deck.gl/geo-layers';
import type { MVTBuildingProperties, PopupInfo } from '../types';
import { MAPBOX_TOKEN } from '../constants';

export function createBuildingLayer(
  setPopupInfo: (info: PopupInfo) => void
) {
  return new MVTLayer<MVTBuildingProperties>({
    id: 'mvt-buildings',
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
        if (info.object.id !== undefined) {
          props.id = info.object.id;
        }
        props.longitude = info.coordinate[0];
        props.latitude = info.coordinate[1];
        setPopupInfo({
          title: 'MVTビル',
          image: '',
          description: props,
          coordinates: [info.coordinate[0], info.coordinate[1]],
        });
      }
    },
  });
}
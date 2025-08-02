export interface RooftopProperties {
  title: string;
  image: string;
  description: string;
}

export interface MVTBuildingProperties {
  id: string | number;
  [key: string]: unknown;
}

export type PopupInfo = {
  title: string;
  image: string;
  description: string | Record<string, unknown>;
  coordinates: [number, number];
} | null;

export interface ViewState {
  latitude: number;
  longitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
}
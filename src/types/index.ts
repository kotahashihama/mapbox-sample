/**
 * GeoJSON 形式の建物データプロパティ
 * 
 * GeoJSON 形式の建物データに付属する情報
 * 本実装では都市緑化ポテンシャル情報を拡張することを想定
 */
export interface GeoJsonBuildingProperties {
  title: string;
  image: string;
  description: string;
}

/**
 * MVT 形式の建物データプロパティ
 * 
 * MVT (Mapbox Vector Tiles) 形式の建物データに付属する情報
 * Feature オブジェクトの ID を含む（建物ごとのデータ紐付けに使用）
 */
export interface MVTBuildingProperties {
  id: string | number;
  [key: string]: unknown;
}

/**
 * ポップアップ表示用の情報
 * 
 * 建物クリック時に Feature ID に対応する都市緑化ポテンシャル情報を表示
 */
export type PopupInfo = {
  title: string;
  image: string;
  description: string | Record<string, unknown>;
  coordinates: [number, number];
} | null;

/**
 * 地図の表示状態
 * 
 * Mapbox と Deck.gl 間で同期されるビューステート
 */
export interface ViewState {
  latitude: number;
  longitude: number;
  zoom: number;
  pitch: number;      // 傾き角度（0-85度、日照シミュレーションに影響）
  bearing: number;    // 方位角（北からの回転角度）
}
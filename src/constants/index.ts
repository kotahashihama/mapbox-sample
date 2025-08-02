/**
 * Mapbox API アクセストークン
 * 
 * MVT (.pbf) の差分読み込みにも使用
 */
export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

/**
 * 地図の初期表示位置（東京タワー周辺）
 * 
 * テスト用に東京タワー近辺に 3D 樹木モデルを配置済み
 */
export const INITIAL_VIEW_STATE = {
  latitude: 35.658,
  longitude: 139.744,
  zoom: 18,           // 建物が明瞭に見えるレベル
  pitch: 60,          // 3D 表示用の傾き
  bearing: -20,       // 北からの回転角度
};
import { style } from '@vanilla-extract/css';

export const popupStyle = style({
  position: 'absolute',
  zIndex: 20,
  background: '#ffe4e1',
  borderRadius: 8,
  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  padding: 12,
  minWidth: 180,
  pointerEvents: 'auto',
});

export const popupTitle = style({
  fontWeight: 'bold',
  marginBottom: 4,
});

export const popupImage = style({
  width: 120,
  borderRadius: 4,
  marginBottom: 4,
});

export const popupTable = style({
  fontSize: 13,
  marginBottom: 4,
});

export const popupTableKey = style({
  fontWeight: 'bold',
  paddingRight: 8,
});

export const popupCloseButton = style({
  marginTop: 8,
});
import { style } from '@vanilla-extract/css';

export const toggleContainer = style({
  position: 'absolute',
  right: 10,
  top: 10,
  zIndex: 11,
  background: 'rgba(255,255,255,0.9)',
  padding: '8px 12px',
  borderRadius: 8,
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  fontSize: 14,
});

export const toggleTitle = style({
  marginBottom: 4,
  fontWeight: 'bold',
});

export const toggleLabel = style({
  display: 'block',
  marginBottom: 4,
  cursor: 'pointer',
});

export const toggleCheckbox = style({
  marginRight: 4,
  cursor: 'pointer',
});
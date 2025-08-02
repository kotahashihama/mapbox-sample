import { style } from '@vanilla-extract/css';

export const controlsContainer = style({
  position: 'absolute',
  right: 10,
  bottom: 10,
  zIndex: 10,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  background: 'rgba(255, 255, 255, 0.8)',
  padding: '8px',
  borderRadius: '8px',
});

export const controlButton = style({
  padding: '6px 12px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  background: 'white',
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'background-color 0.2s',
  ':hover': {
    background: '#f0f0f0',
  },
  ':active': {
    background: '#e0e0e0',
  },
});
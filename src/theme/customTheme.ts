// src/theme/customTheme.ts
import { createTheme, type PaletteMode } from '@mui/material';

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: { main: '#2063A0' },
    secondary: { main: '#00BCD4' },
    background: {
      default: mode === 'dark' ? '#121212' : '#fff',
      paper: mode === 'dark' ? '#1d1d1d' : '#fff',
    },
  },
});

export const createCustomTheme = (mode: PaletteMode = 'light') =>
  createTheme(getDesignTokens(mode));

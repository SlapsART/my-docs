import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createCustomTheme } from '../theme/customTheme';

type ThemeWrapperProps = {
  children: React.ReactNode;
  mode?: 'light' | 'dark';
};

export default function ThemeWrapper({ children, mode = 'light' }: ThemeWrapperProps) {
  const theme = createCustomTheme(mode);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
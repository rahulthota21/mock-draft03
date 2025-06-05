'use client';

import React from 'react';
import { ThemeProvider as MUIThemeProvider, CssBaseline } from '@mui/material';
import { buildTheme } from '@/theme';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MUIThemeProvider theme={buildTheme('dark')}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

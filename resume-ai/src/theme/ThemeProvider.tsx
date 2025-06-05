// src/theme/ThemeProvider.tsx
'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { CssBaseline, PaletteMode, ThemeProvider as MuiProvider } from '@mui/material';
import { buildTheme } from '.';
import { motionSpring } from './designTokens';

/* -------------------------------------------------------------------------
   Google-hosted variable fonts (CLS-safe, zero FOUC)
   NOTE: `General_Sans` isn’t exposed by `next/font/google`; attempting to
   load it triggers the “Unknown font / target.css” build error you saw.
   ----------------------------------------------------------------------- */
import { Inter, Manrope } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

/* -------------------------------------------------------------------------
   Dark / Light mode context
   ----------------------------------------------------------------------- */
type ThemeCtx = { mode: PaletteMode; toggle: () => void };
const Ctx = createContext<ThemeCtx>({ mode: 'dark', toggle: () => {} });
export const useThemeMode = () => useContext(Ctx);

export default function AppThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<PaletteMode>('dark');

  /* Persist user preference in localStorage */
  useEffect(() => {
    const stored = localStorage.getItem('mocknhire-theme');
    if (stored === 'light' || stored === 'dark') setMode(stored as PaletteMode);
  }, []);

  const toggle = () =>
    setMode((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('mocknhire-theme', next);
      return next;
    });

  /* Build the theme only when mode changes */
  const theme = useMemo(() => buildTheme(mode), [mode]);

  return (
    <Ctx.Provider value={{ mode, toggle }}>
      <MuiProvider theme={theme}>
        {/* Expose font variables to CSS */}
        <style jsx global>{`
          html {
            --font-inter: ${inter.style.fontFamily};
            --font-manrope: ${manrope.style.fontFamily};
          }
          /* Optional: respect prefers-reduced-motion */
          @media (prefers-reduced-motion: reduce) {
            * {
              animation: none !important;
              transition: none !important;
            }
          }
        `}</style>

        <CssBaseline />
        {children}
      </MuiProvider>
    </Ctx.Provider>
  );
}

/* Helper: default Framer Motion transition */
export const framerTransition = { ...motionSpring, mass: 0.3 };

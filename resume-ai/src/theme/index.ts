// src/theme/index.ts

import { createTheme, PaletteMode } from '@mui/material/styles';
import { colors, spacing, font } from './designTokens';

/* Extend MUI palette to include our accent */
declare module '@mui/material/styles' {
  interface Palette {
    accent: typeof colors.accent;
  }
  interface PaletteOptions {
    accent?: typeof colors.accent;
  }
}

/** Returns a MUI theme pre-configured for dark mode */
export function buildTheme(mode: PaletteMode = 'dark') {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      accent: colors.accent,
      primary:   { main: colors.accent.primary },
      secondary: { main: colors.accent.secondary },
      error:     { main: colors.accent.error },
      warning:   { main: colors.accent.warning },
      success:   { main: colors.accent.success },
      background: {
        default: isDark ? colors.base.black   : colors.base.white,
        paper:   isDark ? colors.base.grey900 : colors.base.white,
      },
      text: {
        primary:   isDark ? colors.base.white   : colors.base.black,
        secondary: isDark ? colors.base.grey300 : colors.base.grey500,
      },
    },
    spacing,
    shape: { borderRadius: 8 },
    typography: {
      fontFamily: font.body,
      h1: { fontFamily: font.heading, fontWeight: font.weightBold,   fontSize: '2.5rem'  },
      h2: { fontFamily: font.heading, fontWeight: font.weightBold,   fontSize: '2rem'    },
      h3: { fontFamily: font.heading, fontWeight: font.weightMedium, fontSize: '1.75rem' },
      body1: { fontSize: '1rem',    fontWeight: font.weightRegular },
      body2: { fontSize: '0.875rem', fontWeight: font.weightRegular },
      button: { textTransform: 'none', fontWeight: font.weightMedium },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: isDark ? colors.base.black : colors.base.white,
            color:           isDark ? colors.base.white : colors.base.black,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            paddingInline: spacing(4),
            '&:hover': { opacity: 0.9 },
          },
        },
      },
      MuiPaper: {
        styleOverrides: { root: { backgroundImage: 'none' } },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255,255,255,0.08)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.accent.primary,
              boxShadow: `0 0 0 2px ${colors.accent.primary}55`,
            },
          },
        },
      },
    },
  });
}

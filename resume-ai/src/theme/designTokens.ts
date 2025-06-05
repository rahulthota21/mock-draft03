export const colors = {
  base: {
    black: '#0d0d0d',
    white: '#fefefe',
    grey900: '#1a1a1a',
    grey700: '#2e2e2e',
    grey500: '#474747',
    grey300: '#71717a',
  },
  accent: {
    primary: '#6366f1',   // Indigo-500
    secondary: '#14b8a6', // Teal-500
    error: '#ef4444',
    warning: '#eab308',
    success: '#22c55e',
  },
};

export const spacing = (factor: number): string =>
  `${0.25 * factor}rem`; // 4-pt scale

export const font = {
  body: 'var(--font-inter, sans-serif)',
  heading: 'var(--font-jakarta, sans-serif)',
  weightRegular: 400,
  weightMedium: 500,
  weightBold: 600,
};

export const motionSpring = {
  type: 'spring',
  stiffness: 240,
  damping: 30,
};

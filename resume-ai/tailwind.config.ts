// resume-ai/tailwind.config.ts

import type { Config } from 'tailwindcss';
import animatePlugin from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],

  content: [
    // Recruiter/Shared paths
    './src/**/*.{ts,tsx,mdx}',
    './src/components/**/*.{ts,tsx,js,jsx}',
    './src/app/**/*.{ts,tsx,js,jsx}',

    // Student paths (copied from both configs)
    './src/app/dashboard/student/**/*.{ts,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      // --- Background Images & Radial/Conic Gradients from Student (mock) ---
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      // --- Border Radius from Student (mock) ---
      borderRadius: {
        lg: 'var(--radius)',                              // keeps consistency with mock’s radius variables
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      // --- Colors: merge recruiter’s “surface/outline/textBase/textSub/accent” 
      //     with mock’s “background, foreground, card, popover, primary, secondary, muted, destructive, border, input, ring, chart” ---
      colors: {
        // RECRUITER-SIDE COLORS (overwrite or reside alongside mock’s above)
        surface:  '#0d0d0d',   // card background (from recruiter)
        outline:  '#27272a',   // borders / outlines (from recruiter)
        textBase: '#d4d4d8',   // base text color
        textSub:  '#a1a1aa',   // subheading or secondary text
        accent:   '#22c55e',   // Tailwind emerald-500 (calls attention)

        // STUDENT/MOCK COLORS (you loved these)
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },

      // --- Keyframes & Animations from Student (mock) ---
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
      },

      // --- Font Sizes from Recruiter config ---
      fontSize: {
        'display-lg': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }], // 40px
        h1:           ['1.75rem', { lineHeight: '1.3', fontWeight: '700' }], // 28px
        h2:           ['1.25rem', { lineHeight: '1.35', fontWeight: '600' }],// 20px
        body:         ['1rem',    { lineHeight: '1.6', fontWeight: '400' }], // 16px
      },
    },
  },

  plugins: [
    // Student/mocked animations plugin
    animatePlugin,
    // (If you add other Tailwind plugins later, list them here.)
  ],
};

export default config;

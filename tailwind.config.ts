import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        accent: 'hsl(var(--accent))',
        info: 'hsl(var(--info))',
        highlight: 'hsl(var(--highlight))',
        soft: 'hsl(var(--soft))',
        brand: {
          blue: '#4D68FF',
          purple: '#A54DFF',
          indigo: '#6A4DFF',
          cyan: '#4DA1FF',
          pink: '#DF4DFF',
          lavender: '#B1A2FF',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
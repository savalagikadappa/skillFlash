/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0d0f10',
        surface: '#151819',
        accent: '#ff3d5a',
        accent2: '#ff8f3d',
      },
      boxShadow: {
        glow: '0 0 10px -2px rgba(255,61,90,0.4)',
      },
    },
  },
  plugins: [forms, typography],
};

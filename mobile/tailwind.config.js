/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.{js,ts,tsx}', './app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#d1dce1',
          200: '#a4bac4',
          300: '#7697a6',
          400: '#497589',
          500: '#1b526b',
          600: '#164256',
          700: '#103140',
          800: '#0b212b',
          900: '#051015',
        },
      },
    },
  },
  plugins: [],
};

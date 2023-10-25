/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/flowbite/**/*.js'],
  theme: {
    screens: {
      xs: '520px',
    },
    extend: {
      colors: {
        primary: '#242424', // black
        secondary: '#2E2E2E', // gray
        tertiary: '#ffffff', // white
        quaternary: '#1E1E1E', // superdark black
        quinary: '#1D2FCD', // blue
        senary: '#FFFFFF17', // light gray
        septenary: '#C0C0C0', // off white
      },
      spacing: {
        15: '3.7rem',
        17: '4.4rem',
        18: '5.5rem',
        20: '6.1rem',
        25: '6.25rem',
      },
    },
  },
  plugins: [],
};

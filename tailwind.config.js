/* eslint-disable */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        display: ['Bitter', defaultTheme.fontFamily.sans],
        sans: ['Spline Sans', defaultTheme.fontFamily.sans],
      },

      colors: {
        accent: "#154747",
        secondary: "#ffd0ad",
        tertiary: "#f8f1e3",
      },
    },
  },

  plugins: [],
};

const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      xs: "320px",
      sm: "428px",
      md: "744px",
      lg: "1000px",
      xl: "1440px",
      "2xl": "1920px",
    },
  },
  plugins: [heroui()],
};

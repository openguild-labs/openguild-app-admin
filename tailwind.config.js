/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const colors = require("tailwindcss/colors");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      ...colors,
      "primary-color": "#28123E",
      "primary-violet": "#6B3FFD",
      "primary-pink": "#F226EF",
      "primary-blue": "#1879FE",
      "violet-base": "#412062",
      "secondary-grey-darker": "#3D3D3D",
      "secondary-grey": "#666666",
    },
  },
  plugins: [],
};

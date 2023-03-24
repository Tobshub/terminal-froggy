/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        frogGreen: "#B0CD82",
        gunMetal: "#2C363F",
        night: "#0f0f0f",
      },
    },
  },
  plugins: [],
};

module.exports = config;

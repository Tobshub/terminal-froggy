/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  tabWidth: 2,
  printWidth: 80,
  bracketSpacing: true,
  arrowParens: "always",
  semi: true,
};

module.exports = config;

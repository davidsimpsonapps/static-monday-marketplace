/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,njk}"],
  theme: {
    extend: {
      colors: {
        "brand-dark-blue": "#0D4BD0",
        "brand-mid-blue": "#2A7EFF",
        "brand-light-blue": "#78ADFE",
        "brand-white": "#fff",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

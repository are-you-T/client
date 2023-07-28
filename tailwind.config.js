/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#329dfa",
      },
      backgroundImage: {
        main: "url('../src/assets/main.svg')",
      },
    },
  },
  plugins: [require("daisyui")],
};

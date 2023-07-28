/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#329dfa",
        "regal-yellow": "#FFDF3F",
        "regal-purple": "#B2ACF9",
      },
      backgroundImage: {
        main: "url('../src/assets/main.svg')",
        "black-semi-transparent": "rgba(0,0,0,0.7)",

      },
    },
  },
  plugins: [require("daisyui")],
};

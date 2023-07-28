/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#329dfa",
        "black-semi-transparent": "rgba(0,0,0,0.7)",
        "regal-yellow": "#FFDF3F",
        "regal-purple": "#B2ACF9",
      },
    },
  },
  plugins: [require("daisyui")],
};

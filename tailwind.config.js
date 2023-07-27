/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#329dfa",
        "black-semi-transparent": "rgba(0,0,0,0.7)",
      },
    },
  },
  plugins: [require("daisyui")],
};

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
    },
  },
  plugins: [require("daisyui")],
};

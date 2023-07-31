/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  corePlugins: {
    preflight: true,
  },
  theme: {
    extend: {
      colors: {
        brand: "#329dfa",
        "black-semi-transparent": "rgba(0,0,0,0.7)",
        "regal-yellow": "#FFDF3F",
        "regal-purple": "#B2ACF9",
      },
      backgroundImage: {
        main: "url('@/assets/img/main.svg')",
        test: "url('@/assets/img/test.svg')",
      },
      fontSize: {
        vxs: "0.6rem",
      },
    },
  },
  plugins: [require("daisyui")],
};

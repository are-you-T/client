/** @type {import('tailwindcss').Config} */

const testCard = {
  "0%": {
    opacity: 0,
    left: "80px",
    PointerEvent: "none",
  },
  "100%": {
    opacity: 1,
    left: "0px",
    PointerEvent: "auto",
  },
};

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
      keyframes: {
        testCard,
      },
      animation: {
        testCard: "testCard .5s ease-in-out",
      },
    },
  },
  plugins: [require("daisyui")],
};

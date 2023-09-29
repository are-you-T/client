/** @type {import('tailwindcss').Config} */

const testComponent = {
  "0%": {
    opacity: 0,
    left: "80px",
    PointerEvent: "none"
  },
  "100%": {
    opacity: 1,
    left: "0px",
    PointerEvent: "auto"
  }
};

export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const corePlugins = {
  preflight: true
};
export const theme = {
  extend: {
    colors: {
      brand: "#329dfa",
      "black-semi-transparent": "rgba(0,0,0,0.7)",
      "regal-yellow": "#FFDF3F",
      "regal-purple": "#B2ACF9"
    },
    backgroundImage: {
      main: `url('${process.env.REACT_APP_PUBLIC_URL}/main.svg')`,
      test: `url('${process.env.REACT_APP_PUBLIC_URL}/test.svg')`
    },
    fontSize: {
      vxs: "0.6rem"
    },
    keyframes: {
      testComponent
    },
    animation: {
      testComponent: "testComponent .5s ease-in-out"
    }
  }
};
export const plugins = [require("daisyui")];

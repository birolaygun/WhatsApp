module.exports = {
  important: true,

  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("tailwindcss-animation-delay")],

  theme: {


    colors: {
      lightGreen: "#72d298",
      green_100: "#dcf8c6",
      darkGray: "#e9eaeb",
      lightGey: "#e9eaeb",
      blue_100: "#e1f2fb",
      blue_500: "#2fa4f0",
      iceWhite: "#dfdfdf",
      
      green_300: "#4ced69",
      green_500: "#1c5753",
      green_600: "#03b295",
      gray_100: "#babdc2",
      gray_300: "#7e878c",
      gray_500: "#252d30",
      gray_900: "#131c21",
    },

    extend: {
      boxShadow: {
        card: "0px 2px 4px 0px rgba(14, 30, 37, 0.12), 0px 2px 16px 0px rgba(14, 30, 37, 0.32)",
        flag: "0 0 3px 1px #1d2021",
      },
      gridTemplateColumns: {
        responsive: "repeat(auto-fill, minmax(232px, 1fr))",
      },
      keyframes: {
        slideInLeft: {
          "0%": {
            transform: "scela(100%)",
          },
          "100%": {
            transform: "scela(50%)",
          },
        },
        fadeIn: {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        fadeInDown: {
          "0%": {
            opacity: 0,
            transform: "translateY(-10%)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0%)",
          },
        },
      },
      animation: {
        slideInLeft: "slideInLeft 500ms",
        fadeIn: "fadeIn 500ms",
        fadeInDown: "fadeInDown 500ms",
      },
      flexGrow: {
        '2': 2,
        '3': 3
      }
    },
  },
  corePlugins: {
    container: false,
  },
};

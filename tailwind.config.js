module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        primary: "#015249",
        secondary: "#77C9D4",
        light: "#57BC90",
        default: "#A5A5AF",
      },
      fontFamily: {
        body: ["Dancing Script"],
        arabic_body: ["'Vibes'"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

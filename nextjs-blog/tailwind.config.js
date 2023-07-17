/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkgreen: "#366368",
        green: "#8caa8f",
        white: "whitesmoke",
      },
      backgroundImage: {
        "white-marble": "url('../public/assets/img/location-bg.jpg')",
      },
    },
    fontFamily: {
      apple: ["Apple Chancery", "cursive"],
    },
    // screens: {
    // phone: "360px",
    // },
  },
  plugins: [require("daisyui")],
};

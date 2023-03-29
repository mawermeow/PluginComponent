/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    fontFamily:{
      'serif': ['Noto Serif TC'],
      'sans': ['Noto Sans TC'],
    },
    extend: {},
  },
  plugins: [require("daisyui")],
}
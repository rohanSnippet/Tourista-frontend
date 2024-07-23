/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "green": "#39DB4A",
        "red": "#FF6868",
        "primaryBG": "#FCFCFC",
        "secondary": "#555",
        "orange" : "#FF5F1F"
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  }
}


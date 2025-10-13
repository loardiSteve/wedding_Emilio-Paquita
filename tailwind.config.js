/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      colors: {
        "pastel-pink": "#e6d2d6",
        "sky-blue": "#87ceeb",
        "light-sky": "#b0e2ff",
        "soft-pink": "#f4e9ea",
        "wedding-gold": "#f9d67a",
        "wedding-ivory": "#fff8f5",
      },
      fontFamily: {
        "serif-display": ["Playfair Display", "serif"],
        "serif-body": ["Lora", "serif"],
      },
    },
  },
  plugins: [],
};

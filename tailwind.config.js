/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      colors: {
        // Existing custom colors
        "pastel-pink": "#e6d2d6",
        "sky-blue": "#87ceeb",
        "light-sky": "#b0e2ff",
        "soft-pink": "#f4e9ea",
        "wedding-gold": "#f9d67a",
        "wedding-ivory": "#fff8f5",
        // Colors from your CSS variables
        "primary-pastel-pink": "#f8c1ca",
        "primary-sky-blue": "#a2c4d4",
        "primary-soft-rose": "#f4dede",
        "primary-mint": "#d0e8e2",
        "secondary-ivory": "#fdf6f0",
        "secondary-warm-white": "#fff9f4",
        "secondary-light-gray": "#f2f2f2",
        "secondary-charcoal": "#4a4a4a",
        "accent-gold": "#e6b89c",
        "accent-rose": "#e0aedd",
        "accent-sage": "#98b4a9",
        "text-dark": "#333333",
        "text-medium": "#666666",
        "text-light": "#999999",
        "text-white": "#ffffff",
        "bg-primary": "#fdf6f0",
        "bg-secondary": "#fff9f4",
        "bg-tertiary": "#f8f4f0",
        "border-light": "#e8e0d8",
        "border-medium": "#d6cec3",
      },
      fontFamily: {
        "serif-display": ["Playfair Display", "serif"],
        "serif-body": ["Lora", "serif"],
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Agu: ['"Agu Display"', 'serif'], // Custom font
        bello: ['"Bellota"', 'italic'],
        ysab: ['"Ysabeau SC"', 'sans-serif'],
      },
    },
  },
  plugins: [
    // require('@tailwindcss/line-clamp'),
  ],
}

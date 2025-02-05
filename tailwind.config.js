/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          500: '#C7A17A',
          600: '#AF8A63',
        },
        cream: {
          50: '#F9F6F0',
          100: '#F2ECE1',
        }
      },
      fontFamily: {
        Agu: ['"Agu Display"', 'serif'], // Custom font
        bello: ['"Bellota"', 'italic'],
        ysab: ['"Ysabeau SC"', 'sans-serif'],
        cairo: ['"Cairo"', 'sans-serif'],
        mada: ['"Mada"', 'sans-serif'],
      },
    },
  },
  plugins: [
    // require('@tailwindcss/line-clamp'),
  ],
}

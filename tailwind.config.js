/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",      
  ],
  theme: {
    extend: {
      colors: {
        main: "#54EECC",
        background: "#17182c",
        background2: "#27284B",
        body:'#D1D5DB',
        stroke:"#4C4C66",
        glass:'rgba(175, 175, 175, 0.10)'
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hospital-blue': '#0066cc',
        'hospital-green': '#00a86b',
        'hospital-red': '#cc0000',
      },
    },
  },
  plugins: [],
}

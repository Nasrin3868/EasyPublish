/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" //add this line 
  ],
  darkMode: 'class', // Enable dark mode support (class-based)
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin') // Add this line
  ],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'hero': "linear-gradient(to bottom right, rgba(0,0,0,0.2), rgba(0,0,0,0.9)), url('src/assets/hero.jpg')"
      },
    },
  },
  plugins: [
  ],
}


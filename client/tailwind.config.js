export default {
  plugins: [
    require('tailwind-scrollbar-hide')
  ],

  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode : 'class',
  theme : {
    extends : {
      colors: {
        primaray : 'var(--bg-color-primaray)',
        secondary: 'var(--bg-color-secondary)',
        
      }
    }
  }

}
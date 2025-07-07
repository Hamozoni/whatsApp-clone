export default {
  plugins: [
    require('tailwind-scrollbar-hide')
  ],

  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode : 'class',
  theme : {
    extends : {
      colors: {
        bg_primaray : 'var(--bg-color-primaray)',
        bg_secondary: 'var(--bg-color-secondary)',
        text_primaray : 'var(--text-color-primaray)',
        text_secondary: 'var(--text-color-secondary)',
        
      }
    }
  }

}
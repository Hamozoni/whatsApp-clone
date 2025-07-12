export default {
  content: ['./index.html',"./src/**/*.{js,ts,jsx,tsx}"],
  darkMode : 'class',
  theme : {
    extend: {
      colors: {
        bg_primaray : '#111b21',
        bg_secondary: '111b21',
        text_primaray : 'var(--text-color-primaray)',
        text_secondary: 'var(--text-color-secondary)',
        dark : {
            bg_primaray : '#111b21',
            bg_secondary: '111b21',
            text_primaray : 'var(--text-color-primaray)',
            text_secondary: 'var(--text-color-secondary)',
        }
        
      }
    }
  }

}
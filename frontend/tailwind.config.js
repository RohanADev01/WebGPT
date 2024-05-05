/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundColor: {
        // 'app-bg': '#0B0F19',
        'app-bg': '#212121',
      },
      borderColor: {
        'app-outline': '#FFFFFF',
      },
      backgroundImage: {
        'gradient-border': 'linear-gradient(to left, #3ccde1, #04eabc)',
      },
      spacing: {
        '1px': '1px',
        '1/20': '5%',
        '9/10': '90%',
        '95/100': '95%',
      },
      borderImageSource: {
        'gradient-top': 'linear-gradient(to left, #3ccde1, #04eabc)',
      },
      borderWidth: {
        'top-5': '0px 0px 5px 0px',
      },
    },
  },
  plugins: [],
}
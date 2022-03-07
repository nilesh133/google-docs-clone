module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'arial': ['Arial', 'sans-serif']
      },
      screens: {
        'xsm': '530px',
      }
    },
  },
  plugins: [],
}
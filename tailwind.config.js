/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: (theme) => ({
        'custom-gradient': 'linear-gradient(210.52deg, rgba(197, 119, 186, 0.2) 1.28%, rgba(49, 141, 201, 0.2) 95.42%)',
        'main-gradient': 'linear-gradient(210.52deg, #C577BA 1.28%, #318DC9 95.42%);',
      }),
      borderRadius: {
        'curved-bottom': '50% 87px',
      },
      colors: {
        'primary-color': '#333333',
        'light-grey': '#E4E4E4',
        'natural-grey': '#6B6F80',
        'secondary-color': '#009DFF',
        'dark-grey': '#646464',
        'light-blue': '4f69ff',
      },
      fontSize: {
        'small-icon': '20px',
        'medium-icon': '25px',
        'large-icon': '35px',
        'extra-small': '10px',
        'ex-small': '8px',
      },
      textColor: {
        'light-blue': '#4f69ff',
      },
      height: {
        '70vh': '70vh',
        '86%': '86%',
      },
      keyframes: {
        slideFromRight: {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: 1,
          },
        },
        slideAgain: {
          '0%': {
            transform: 'translateX(0)',
            opacity: 1,
          },
          '100%': {
            transform: 'translateX(-100%)',
            opacity: 0,
          },
        },
      },
      animation: {
        slideFromRight: 'slideFromRight 0.4s ease-out',
        slideAgain: 'slideAgain 0.4s ease-out',
      },
    },
  },
  plugins: [],
};

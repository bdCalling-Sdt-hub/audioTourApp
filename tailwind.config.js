const plugin = require('tailwindcss/plugin');

module.exports = {
  theme: {
    screens: {
      sm: '300px',
      md: '400px',
      lg: '880px',
      tablet: '1024px',
    },
    extend: {
      fontFamily: {
        // Montserrat fonts
        MontserratThin: 'Montserrat-Thin',
        MontserratExtraLight: 'Montserrat-ExtraLight',
        MontserratLight: 'Montserrat-Light',
        MontserratRegular: 'Montserrat-Regular',
        MontserratMedium: 'Montserrat-Medium',
        MontserratSemiBold: 'Montserrat-SemiBold',
        MontserratBold: 'Montserrat-Bold',
        MontserratExtraBold: 'Montserrat-ExtraBold',
        MontserratItalic: 'Montserrat-Italic',
      },

      colors: {
        primaryBase: '#0187D1',
        offWhite: '#B6B6BA',
        textPrimary: '#1F1F1F',
        textSecondary: '#525252',
        primary: '#008080',
        primary50: '#0093B4',
        primary100: '#8AE9FE',
        primary200: '#ffffff',
        primary300: '#E7E7E9',
        primary400: '#00BCE6',
        inputBg: '#60606A',
        inputBorder: '#41414D',
        premium: '#FFA500',
        secondaryPremium: '#FFE9C8',
        danger: '#E57373',
        success: '#81C784',
        darkSub: '#929299',
        offSub: '#E8E8EA',
        secondaryDark: '#9F9F9F',
        secondaryBg: '#B0F0FE',
        secondaryOffWhite: '#A5A3A9',
        // success: {
        //   dark: '#28a745',
        //   light: '#cce53f',
        // },
        error: {
          dark: '#dc3545',
          light: '#f8d7da',
        },
        info: {
          dark: '#17a2b8',
          light: '#d3e9fd',
        },
      },
    },
  },
  plugins: [
    plugin(({addUtilities}) => {
      addUtilities({
        '.btn': {
          padding: 3,
          borderRadius: 10,
          textTransform: `uppercase`,
          backgroundColor: `#333`,
        },
        '.resize-repeat': {
          resizeMode: `repeat`,
        },
      });
    }),
  ],
};

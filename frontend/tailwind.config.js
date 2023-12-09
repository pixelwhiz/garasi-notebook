/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      backgroundColor: {
        'primary': '#5b89d4',
      },
      borderColor: {
        'primary': '#5b89d4',
      },
      textColor: {
        'primary': '#5b89d4',
      },
      boxShadow: {
        'primary': '#5b89d4',
      },
    },
  },
  content: [
    "./src/**/*.{html,js,vue}",
  ],
  daisyui: {
    theme: {
      extend: {
        backgroundColor: {
          'biru': '#5b89d4',
        },
      },
    },
  },
  plugins: [
    require("daisyui"),
    function ({ addUtilities, theme, variants }) {
      const keyframes = {
        '@keyframes slideInDown': {
          '0%': {
            transform: 'translateY(-10%)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
      };

      addUtilities(keyframes, variants('animation'));
    },
    function ({ addUtilities, theme, variants }) {
      const utilities = {
        '.animate-slide-in-down': {
          animation: 'slideInDown 0.25s ease-in-out',
        },
      };

      addUtilities(utilities, variants('animation'));
    },
    function ({ addUtilities, theme, variants }) {
      const keyframes = {
        '@keyframes slideInRight': {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
      };

      addUtilities(keyframes, variants('animation'));
    },
    function ({ addUtilities, theme, variants }) {
      const utilities = {
        '.animate-slide-in-right': {
          animation: 'slideInRight 0.25s ease-in-out',
        },
      };

      addUtilities(utilities, variants('animation'));
    },
  ],
  darkMode: "class",
}

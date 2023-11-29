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
  plugins: [require("daisyui")],
  darkMode: "class"
}
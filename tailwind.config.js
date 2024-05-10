/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        mainColor: '#42cec8', // 원하는 색상 코드 입력
      },
    },
  },
  plugins: [],
}


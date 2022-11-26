/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        prompt: ['var(--font-prompt)'],
        montserrat: ['var(--font-montserrat)']
      },
      fontSize: {
        sm: '0.8125rem',
        base: '0.9375rem',
        md: '1.0625rem'
      }
    },
  },
  plugins: [],
}

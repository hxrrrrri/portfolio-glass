/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF4D2D',
        'accent': '#FF4D2D',
      },
      fontFamily: {
        display: ['"SF Pro Display"', '"Inter"', 'system-ui', 'sans-serif'],
        body:    ['"SF Pro Text"',    '"Inter"', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
        sm: '8px',
        md: '16px',
        lg: '32px',
        xl: '64px',
      },
    },
  },
  plugins: [],
}

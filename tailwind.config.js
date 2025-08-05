/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        'primary-dark': '#4f46e5',
        secondary: '#0ea5e9',
        accent: '#06b6d4',
        'accent-secondary': '#f59e0b',
        dark: '#0f172a',
        light: '#f8fafc',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 6s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'circuit-move': 'circuitMove 40s linear infinite',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(20px, 15px) rotate(5deg)' },
          '50%': { transform: 'translate(10px, 30px) rotate(0deg)' },
          '75%': { transform: 'translate(-15px, 20px) rotate(-5deg)' },
          '100%': { transform: 'translate(0, 0) rotate(0deg)' },
        },
        circuitMove: {
          '0%': { transform: 'rotate(10deg) translate(0, 0)' },
          '100%': { transform: 'rotate(10deg) translate(-60px, -60px)' },
        },
      },
    },
  },
  plugins: [],
}

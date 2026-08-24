/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          darkest: '#0b1329',
          dark: '#0f172a',
          card: '#152238',
          surface: '#1c2c4a',
          border: '#2a3f68',
          borderLight: '#3b558c',
          gold: '#e5a93c',
          goldLight: '#f6c368',
          goldDark: '#c48924',
          goldMuted: '#947029',
          navy: '#0A2540',
          navyLight: '#1e3a5f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-gradient': 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)',
        'gold-glow': 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
        'light-mesh': 'radial-gradient(circle at 50% 0%, rgba(229, 169, 60, 0.15) 0%, rgba(15, 23, 42, 0) 70%), radial-gradient(circle at 100% 100%, rgba(30, 58, 95, 0.4) 0%, rgba(11, 19, 41, 0) 60%)',
      },
      boxShadow: {
        'gold-sm': '0 0 15px rgba(229, 169, 60, 0.2)',
        'gold-md': '0 0 25px rgba(229, 169, 60, 0.3)',
        'gold-lg': '0 0 40px rgba(229, 169, 60, 0.4)',
        'card-elevated': '0 10px 30px -5px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.08)',
      },
    },
  },
  plugins: [],
}

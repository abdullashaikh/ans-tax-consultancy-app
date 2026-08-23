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
          darkest: '#050811',
          dark: '#0a0f1d',
          card: '#10172a',
          surface: '#162238',
          border: '#1e2f4f',
          borderLight: '#2a416b',
          gold: '#e5a93c',
          goldLight: '#f6c368',
          goldDark: '#c48924',
          goldMuted: '#947029',
          navy: '#0A2540',
          navyLight: '#183861',
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
        'dark-mesh': 'radial-gradient(circle at 50% 0%, rgba(229, 169, 60, 0.08) 0%, rgba(10, 15, 29, 0) 70%), radial-gradient(circle at 100% 100%, rgba(10, 37, 64, 0.4) 0%, rgba(5, 8, 17, 0) 60%)',
      },
      boxShadow: {
        'gold-sm': '0 0 15px rgba(229, 169, 60, 0.15)',
        'gold-md': '0 0 25px rgba(229, 169, 60, 0.25)',
        'gold-lg': '0 0 40px rgba(229, 169, 60, 0.35)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'player-left': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        'player-right': {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
      },
      animation: {
        'pulse-win': 'pulse-win 0.5s ease-in-out infinite',
        'shake': 'shake 0.5s ease-in-out',
        'rope-pull': 'rope-pull 0.3s ease-out',
      },
      keyframes: {
        'pulse-win': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        'rope-pull': {
          '0%': { transform: 'scaleX(0.98)' },
          '50%': { transform: 'scaleX(1.02)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
    },
  },
  plugins: [],
}

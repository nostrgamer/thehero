/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bitcoin-orange': '#f7931a',
        'bitcoin-dark': '#ff6b35',
        'hero-blue': '#2563eb',
        'success-green': '#10b981',
        'warning-red': '#ef4444'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)'
      },
      minHeight: {
        'touch': '44px' // Minimum touch target
      }
    },
  },
  plugins: [],
} 
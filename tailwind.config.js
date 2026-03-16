/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-pink': '#ff2e63',
        'neon-teal': '#08d9d6',
        'neon-yellow': '#f7f48b',
        'dark-bg': '#0b0b0b',
        'dark-card': '#111111',
        'dark-border': '#1a1a1a',
      },
      fontFamily: {
        'display': ['"Black Han Sans"', 'sans-serif'],
        'mono': ['"Share Tech Mono"', 'monospace'],
        'body': ['"Rajdhani"', 'sans-serif'],
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px #ff2e63, 0 0 40px #ff2e63, 0 0 80px #ff2e6340' },
          '50%': { boxShadow: '0 0 40px #ff2e63, 0 0 80px #ff2e63, 0 0 120px #ff2e6360' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-20px) rotate(5deg)' },
          '66%': { transform: 'translateY(10px) rotate(-3deg)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'flicker': {
          '0%, 100%': { opacity: 1 },
          '92%': { opacity: 1 },
          '93%': { opacity: 0.4 },
          '94%': { opacity: 1 },
          '96%': { opacity: 0.2 },
          '97%': { opacity: 1 },
        },
        'text-glow': {
          '0%, 100%': { textShadow: '0 0 10px #ff2e63, 0 0 30px #ff2e63' },
          '50%': { textShadow: '0 0 20px #ff2e63, 0 0 60px #ff2e63, 0 0 100px #ff2e63' },
        },
        'teal-glow': {
          '0%, 100%': { textShadow: '0 0 10px #08d9d6, 0 0 30px #08d9d6' },
          '50%': { textShadow: '0 0 20px #08d9d6, 0 0 60px #08d9d6, 0 0 100px #08d9d6' },
        },
        'card-appear': {
          '0%': { opacity: 0, transform: 'perspective(1000px) rotateY(-90deg) scale(0.8)' },
          '100%': { opacity: 1, transform: 'perspective(1000px) rotateY(0deg) scale(1)' },
        },
        'number-impact': {
          '0%': { transform: 'scale(0.3)', opacity: 0 },
          '50%': { transform: 'scale(1.3)', opacity: 1 },
          '70%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        'explosion': {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(1.5)', opacity: 0.8 },
          '100%': { transform: 'scale(0)', opacity: 0 },
        }
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 8s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite',
        'float-fast': 'float 5s ease-in-out infinite',
        'scan-line': 'scan-line 4s linear infinite',
        'flicker': 'flicker 6s linear infinite',
        'text-glow': 'text-glow 2s ease-in-out infinite',
        'teal-glow': 'teal-glow 2s ease-in-out infinite',
        'card-appear': 'card-appear 0.6s ease-out forwards',
        'number-impact': 'number-impact 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      }
    },
  },
  plugins: [],
}

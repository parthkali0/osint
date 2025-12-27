/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tech-bg': '#0a0e1a',
        'tech-cyan': '#00f3ff',
        'tech-green': '#00ff9d',
        'tech-red': '#ff003c',
        'tech-dim': 'rgba(0, 243, 255, 0.1)',
      },
      fontFamily: {
        'mono': ['"Fira Code"', 'monospace'],
        'display': ['"Orbitron"', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

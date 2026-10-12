/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        spring: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#10b981', // Crisp mint
          600: '#059669',
          700: '#047857'
        },
        azure: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // Sky blue
          600: '#0284c7'
        },
        coral: {
          50: '#fff7ed',
          100: '#ffedd5',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c'
        },
        lavender: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea'
        },
        velvet: {
          950: '#070a13',
          900: '#0b0f19',
          850: '#111827',
          800: '#1e293b',
          700: '#334155'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace']
      },
      boxShadow: {
        'glow-spring': '0 0 25px -5px rgba(16, 185, 129, 0.25)',
        'glow-azure': '0 0 25px -5px rgba(14, 165, 233, 0.25)',
        'glow-coral': '0 0 25px -5px rgba(249, 115, 22, 0.25)',
        'card-soft': '0 10px 30px -10px rgba(0, 0, 0, 0.05), 0 2px 8px -2px rgba(0, 0, 0, 0.03)'
      }
    },
  },
  plugins: [],
}

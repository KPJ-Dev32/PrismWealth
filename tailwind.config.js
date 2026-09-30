/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#0B0F17',
          card: '#111827',
          elevated: '#161D2C',
          border: '#1F2937',
        },
        accent: {
          DEFAULT: '#00D09C',
          muted: '#00D09C33',
          hover: '#00B888',
        },
        secondary: {
          DEFAULT: '#06B6D4',
          muted: '#06B6D433',
        },
        warn: {
          DEFAULT: '#F59E0B',
          muted: '#F59E0B33',
        },
        danger: {
          DEFAULT: '#EF4444',
          muted: '#EF444433',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'slide-in-right': 'slideInRight 0.35s cubic-bezier(0.16,1,0.3,1)',
        'fade-up': 'fadeUp 0.4s ease-out',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 8px 0px #00D09C66' },
          '50%': { boxShadow: '0 0 20px 4px #00D09CAA' },
        },
        slideInRight: {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

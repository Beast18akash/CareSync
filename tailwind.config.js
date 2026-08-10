/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#003b1b',
          light: '#b1f2be',
          dark: '#14532d',
        },
        secondary: '#006e2d',
        success: '#006e2d',
        warning: '#92400E',
        danger: '#ba1a1a',
        background: '#f0fdf1',
        card: '#FFFFFF',
        text: {
          dark: '#17201A',
          muted: '#404941',
        },
        'text-primary': '#17201A',
        'on-background': '#131e17',
        'soft-green-surface': '#DCFCE7',
        'border-quiet': '#E3E9E3',
        'surface-white': '#FFFFFF',
        'background-subtle': '#F6F8F5',
        'surface-container-high': '#dfebe0',
        'on-surface-variant': '#404941',
        'surface-tint': '#2e6a41',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)',
        'gradient-subtle': 'linear-gradient(180deg, #F0F9FF 0%, #F8FAFC 50%, #F1F5F9 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.95) 100%)',
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)',
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)',
        'elevated': '0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
        'navbar': '0 1px 3px 0 rgb(0 0 0 / 0.04)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-hover': '0 12px 40px 0 rgba(31, 38, 135, 0.12)',
        'gradient-card': '0 4px 24px -4px rgba(37, 99, 235, 0.15), 0 2px 8px -2px rgba(56, 189, 248, 0.1)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      backdropBlur: {
        'glass': '12px',
      },
    },
  },
  plugins: [],
}

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: '#0D0F11',
          900: '#14181C',
          800: '#1E242A',
          700: '#2A323C',
          600: '#384250',
        },
        navy: {
          950: '#0A0F1A',
          900: '#0F172A',
          800: '#1E293B',
          700: '#334155',
        },
        ivory: {
          100: '#FDFBF7',
          200: '#F5F0E8',
          300: '#E8DFD0',
          400: '#D4C9B0',
        },
        champagne: {
          400: '#C9B896',
          500: '#B8A484',
          600: '#A38F6E',
          700: '#8B7A5A',
        },
        success: {
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
        },
        danger: {
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
        },
        slate: {
          400: '#94A3B8',
          500: '#64748B',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 6vw, 5rem)', { lineHeight: '1.1', fontWeight: '700' }],
        'display-lg': ['clamp(2.25rem, 4.5vw, 3.5rem)', { lineHeight: '1.15', fontWeight: '700' }],
        'display-md': ['clamp(1.75rem, 3.5vw, 2.5rem)', { lineHeight: '1.2', fontWeight: '600' }],
        'display-sm': ['clamp(1.375rem, 2.5vw, 1.875rem)', { lineHeight: '1.25', fontWeight: '600' }],
        'heading-xl': ['clamp(1.5rem, 2vw, 2rem)', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-lg': ['clamp(1.25rem, 1.5vw, 1.5rem)', { lineHeight: '1.35', fontWeight: '600' }],
        'heading-md': ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }],
        'heading-sm': ['1rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['0.75rem', { lineHeight: '1.4', fontWeight: '400' }],
        'data-lg': ['1.5rem', { lineHeight: '1.2', fontWeight: '600', fontFamily: 'JetBrains Mono' }],
        'data': ['1.125rem', { lineHeight: '1.2', fontWeight: '500', fontFamily: 'JetBrains Mono' }],
        'data-sm': ['0.875rem', { lineHeight: '1.2', fontWeight: '500', fontFamily: 'JetBrains Mono' }],
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
      },
      borderRadius: {
        'none': '0',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0,0,0,0.3)',
        'md': '0 4px 12px rgba(0,0,0,0.35)',
        'lg': '0 12px 32px rgba(0,0,0,0.4)',
        'xl': '0 24px 48px rgba(0,0,0,0.45)',
        'champagne': '0 0 0 1px #C9B896, 0 8px 24px rgba(201,184,150,0.15)',
      },
      transitionDuration: {
        'instant': '0ms',
        'fast': '150ms',
        'base': '250ms',
        'slow': '350ms',
        'slower': '500ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'ease-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 250ms ease-out',
        'slide-up': 'slideUp 350ms ease-out',
        'slide-down': 'slideDown 350ms ease-out',
        'scale-in': 'scaleIn 200ms ease-spring',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#050505',
          secondary: '#0C0C0C',
          surface: '#111111',
          elevated: '#171717',
        },
        primary: '#F5F5F5',
        secondary: '#A5A5A5',
        muted: '#666666',
        accent: {
          DEFAULT: '#3b82f6',
          cool: '#60a5fa',
          silver: '#e2e8f0',
          cyan: '#38bdf8',
          glow: 'rgba(96, 165, 250, 0.12)',
        },
        glass: {
          1: 'rgba(255, 255, 255, 0.04)',
          2: 'rgba(255, 255, 255, 0.06)',
          3: 'rgba(255, 255, 255, 0.08)',
          border1: 'rgba(255, 255, 255, 0.10)',
          border2: 'rgba(255, 255, 255, 0.16)',
          borderGlow: 'rgba(255, 255, 255, 0.25)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Satoshi', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        pixel: ['"Pixelify Sans"', '"Silkscreen"', '"Press Start 2P"', 'monospace'],
      },
      backdropBlur: {
        xs: '3px',
        glass: '16px',
        heavy: '24px',
      },
      boxShadow: {
        'glass-sm': '0 4px 20px -2px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        'glass-md': '0 8px 32px 0 rgba(0, 0, 0, 0.6), inset 0 1px 0 0 rgba(255, 255, 255, 0.12)',
        'glass-lg': '0 20px 48px -8px rgba(0, 0, 0, 0.7), inset 0 1px 1px 0 rgba(255, 255, 255, 0.16)',
        'glow-subtle': '0 0 35px -5px rgba(96, 165, 250, 0.15)',
        'glow-silver': '0 0 40px -5px rgba(255, 255, 255, 0.08)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseGlow 4s ease-in-out infinite',
        'marquee-left': 'marqueeLeft 35s linear infinite',
        'marquee-right': 'marqueeRight 35s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        marqueeLeft: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeRight: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      }
    },
  },
  plugins: [],
}

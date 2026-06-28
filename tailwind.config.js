/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      colors: {
        'void': '#030308',
        'ink': '#0a0a18',
        'surface': '#0f0f1e',
        'panel': '#141428',
        'border': '#1e1e3a',
        'glow': {
          cyan: '#00f5ff',
          purple: '#8b5cf6',
          green: '#00ff88',
          orange: '#ff6b35',
        },
        'text': {
          primary: '#e8e8f0',
          secondary: '#9090b0',
          muted: '#505070',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 3s linear infinite',
        'grid-fade': 'gridFade 8s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'cursor-blink': 'cursorBlink 1s step-end infinite',
        'orbit': 'orbit 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        gridFade: {
          '0%, 100%': { opacity: '0.03' },
          '50%': { opacity: '0.08' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        cursorBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(0, 245, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 245, 255, 0.03) 1px, transparent 1px)`,
        'radial-glow': 'radial-gradient(ellipse at center, rgba(0, 245, 255, 0.15) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
};

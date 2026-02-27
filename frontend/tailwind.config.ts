import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Premium black & gold palette
        charcoal: '#0A0A0A',
        surface: '#141414',
        border: '#2A2A2A',
        gold: '#C9A84C',
        'gold-light': '#E8C76A',
        'gold-dark': '#A07A30',
        cream: '#F5F0E8',
        muted: '#8A8A8A',
        // Standard colors
        primary: '#C9A84C',
        secondary: '#E8C76A',
        danger: '#E53E3E',
        success: '#38A169',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        xs: ['12px', '16px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['18px', '28px'],
        xl: ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['30px', '36px'],
        '4xl': ['36px', '40px'],
        '5xl': ['48px', '48px'],
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.5)',
        base: '0 4px 6px rgba(0, 0, 0, 0.6)',
        md: '0 10px 15px rgba(0, 0, 0, 0.7)',
        lg: '0 20px 25px rgba(0, 0, 0, 0.8)',
        xl: '0 25px 50px rgba(0, 0, 0, 0.9)',
        glow: '0 0 20px rgba(201, 168, 76, 0.3)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #E8C76A 100%)',
        'dark-gradient': 'linear-gradient(135deg, #0A0A0A 0%, #141414 100%)',
      },
    },
  },
  plugins: [],
}
export default config

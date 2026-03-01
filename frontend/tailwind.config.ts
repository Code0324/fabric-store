import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Light-theme palette — semantic names preserved so all components remap automatically
        charcoal:     '#FAF7F2',   // main bg  (was #0A0A0A)
        surface:      '#FFFFFF',   // card bg   (was #141414)
        border:       '#E0D8CC',   // borders   (was #2A2A2A)
        gold:         '#B8963E',   // accent    (was #C9A84C)
        'gold-light': '#D4AF5A',   // hover     (was #E8C76A)
        'gold-dark':  '#9A7A2E',   // pressed   (was #A07A30)
        cream:        '#1A1A1A',   // text      (was #F5F0E8)
        muted:        '#6B6560',   // secondary text
        // New additions
        ivory:        '#F5F0E8',   // secondary bg
        dark:         '#1A1A1A',   // explicit dark for CTA
        primary:      '#B8963E',
        secondary:    '#D4AF5A',
        danger:       '#E53E3E',
        success:      '#38A169',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:  ['Jost', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['10px', '14px'],
        xs:    ['11px', '16px'],
        sm:    ['13px', '20px'],
        base:  ['15px', '24px'],
        lg:    ['17px', '26px'],
        xl:    ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['32px', '38px'],
        '4xl': ['42px', '48px'],
        '5xl': ['52px', '56px'],
        '6xl': ['64px', '68px'],
      },
      borderRadius: {
        none:    '0',
        sm:      '1px',
        DEFAULT: '0',
        md:      '1px',
        lg:      '2px',
        xl:      '2px',
        '2xl':   '2px',
        '3xl':   '2px',
        full:    '9999px',
      },
      boxShadow: {
        sm:   '0 1px 4px rgba(0,0,0,0.04)',
        base: '0 2px 20px rgba(0,0,0,0.04)',
        md:   '0 4px 16px rgba(0,0,0,0.08)',
        lg:   '0 12px 40px rgba(0,0,0,0.10)',
        xl:   '0 20px 60px rgba(0,0,0,0.12)',
        glow: '0 0 40px rgba(184,150,62,0.15)',
        card: '0 12px 40px rgba(0,0,0,0.10)',
        nav:  '0 2px 20px rgba(0,0,0,0.04)',
      },
      backgroundImage: {
        'gold-gradient':  'linear-gradient(135deg, #B8963E 0%, #D4AF5A 100%)',
        'hero-gradient':  'linear-gradient(135deg, #FAF7F2 0%, #F0E6C8 50%, #FAF7F2 100%)',
        'dark-gradient':  'linear-gradient(135deg, #1A1A1A 0%, #2C2420 100%)',
        'ivory-gradient': 'linear-gradient(135deg, #F5F0E8 0%, #EDE5D4 100%)',
      },
      letterSpacing: {
        widest: '0.25em',
        ultra:  '0.35em',
      },
    },
  },
  plugins: [],
}
export default config

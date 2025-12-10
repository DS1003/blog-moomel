/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Palette Luxe 2025
        primary: {
          50: '#F9F7F2',  // Creme
          100: '#F2E8D5',
          200: '#E6D3AB',
          300: '#D9B87D', // Or clair
          400: '#CC9D53',
          500: '#B88636', // Or/Bronze principal
          600: '#9A6B29',
          700: '#7B5222', // Marron chaud
          800: '#654222',
          900: '#54361F',
        },
        neutral: {
          50: '#FAFAF9',  // Pierre chaude
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524', // Noir chaud
          900: '#1C1917',
        },
        accent: {
          50: '#FFF1F2',
          100: '#FFE4E6',
          200: '#FECDD3',
          300: '#FDA4AF',
          400: '#FB7185',
          500: '#F43F5E', // Rose doux
          600: '#E11D48',
          700: '#BE123C',
          800: '#9F1239',
          900: '#881337',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
      },
      backdropBlur: {
        xs: '2px',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            color: '#44403C', // neutral-700
            '--tw-prose-headings': '#54361F', // primary-900
            '--tw-prose-links': '#B88636', // primary-500
            '--tw-prose-bold': '#1C1917', // neutral-900
            '--tw-prose-quotes': '#7B5222', // primary-700
            // Headings
            h1: {
              fontFamily: 'var(--font-playfair), serif',
              fontWeight: '700',
              color: 'var(--tw-prose-headings)',
            },
            h2: {
              fontFamily: 'var(--font-playfair), serif',
              fontWeight: '600',
              fontSize: '1.875em',
              marginTop: '2em',
              marginBottom: '1em',
              paddingBottom: '0.5em',
              borderBottom: '1px solid #E6D3AB', // primary-200
              color: '#7B5222', // primary-700
            },
            h3: {
              fontFamily: 'var(--font-playfair), serif',
              fontWeight: '600',
              fontSize: '1.5em',
              marginTop: '1.6em',
              marginBottom: '0.6em',
              color: '#9A6B29', // primary-600
            },
            // Body text
            p: {
              lineHeight: '2',
              marginTop: '1.5em',
              marginBottom: '1.5em',
              fontSize: '1.125rem', // 18px base size
              color: '#292524', // neutral-800
            },
            // Blockquotes
            blockquote: {
              fontFamily: 'var(--font-playfair), serif',
              fontStyle: 'italic',
              fontWeight: '500',
              borderLeftWidth: '4px',
              borderLeftColor: '#D9B87D', // primary-300
              backgroundColor: '#F9F7F2', // primary-50
              padding: '2rem',
              quotes: '"\\201C""\\201D""\\2018""\\2019"',
              marginTop: '2.5em',
              marginBottom: '2.5em',
              borderRadius: '0.5rem',
            },
            // Links
            a: {
              color: '#9A6B29', // primary-600
              textDecoration: 'none',
              borderBottom: '1px solid #D9B87D', // primary-300
              transition: 'all 0.2s',
              fontWeight: '500',
              '&:hover': {
                color: '#7B5222', // primary-700
                borderBottomColor: '#7B5222',
              },
            },
            // Lists
            'ul > li::marker': {
              color: '#D9B87D', // primary-300
            },
            'ol > li::marker': {
              color: '#9A6B29', // primary-600
              fontWeight: '600',
            },
            // Code
            code: {
              color: '#7B5222', // primary-700
              backgroundColor: '#F2E8D5', // primary-100
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '600',
            },
            // Images
            img: {
              borderRadius: '0.75rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              marginTop: '2em',
              marginBottom: '2em',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
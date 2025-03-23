import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      screens: {
        lg: '1440px',
        md: '1200px',
        sm: '992px',
        xs: '768px',
        xxs: '576px',
        xxxs: '376px'
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '15px',
          md: '28px'
        },
        screens: {
          DEFAULT: '100%',
          md: '1140px',
          sm: '960px'
        }
      },
      colors: {
        primary: {
          900: '#331B0A',
          800: '#663514',
          700: '#99501F',
          600: '#DE732D',
          500: '#FA8232',
          400: '#FF9D5C',
          300: '#FFB685',
          200: '#FFCEAD',
          100: '#FFE7D6',
          50: '#FFF3EB'
        },
        secondary: {
          900: '#092131',
          800: '#124261',
          700: '#1B6392',
          600: '#2484C2',
          500: '#2DA5F3',
          400: '#57B7F5',
          300: '#81C9F8',
          200: '#ABDBFA',
          100: '#D5EDFD',
          50: '#EAF6FE'
        },
        success: {
          900: '#092407',
          800: '#12470E',
          700: '#1B6B16',
          600: '#248E1D',
          500: '#2DB224',
          400: '#57C150',
          300: '#81D17C',
          200: '#ABE0A7',
          100: '#D5F0D3',
          50: '#EAF7E9'
        },
        warning: {
          900: '#2F2802',
          800: '#5E5005',
          700: '#8D7807',
          600: '#BCA00A',
          500: '#EBC80C',
          400: '#EFD33D',
          300: '#F3DE6D',
          200: '#F7E99E',
          100: '#FBF4CE',
          50: '#FDFAE7'
        },
        danger: {
          900: '#301212',
          800: '#5F2323',
          700: '#8F3535',
          600: '#BE4646',
          500: '#EE5858',
          400: '#F17979',
          300: '#F59B9B',
          200: '#F8BCBC',
          100: '#FCDEDE',
          50: '#FDEEEE'
        },
        gray: {
          900: '#191C1F',
          800: '#303639',
          700: '#475156',
          600: '#5F6C72',
          500: '#77878F',
          400: '#929FA5',
          300: '#ADB7BC',
          200: '#C9CFD2',
          100: '#E4E7E9',
          50: '#F2F4F5'
        }
      },
      fontSize: {
        display1: [
          '4rem',
          {
            letterSpacing: '0rem',
            lineHeight: '4.5rem',
            fontWeight: '700'
          }
        ],
        display2: [
          '3.5rem',
          {
            letterSpacing: '0rem',
            lineHeight: '4rem',
            fontWeight: '700'
          }
        ],
        display3: [
          '3rem',
          {
            letterSpacing: '0rem',
            lineHeight: '3.5rem',
            fontWeight: '700'
          }
        ],
        display4: [
          '2.5rem',
          {
            letterSpacing: '0rem',
            lineHeight: '3rem',
            fontWeight: '700'
          }
        ],
        display5: [
          '2.25rem',
          {
            letterSpacing: '0rem',
            lineHeight: '2.75rem',
            fontWeight: '700'
          }
        ],
        heading1: [
          '2rem',
          {
            letterSpacing: '0rem',
            lineHeight: '2.5rem',
            fontWeight: '700'
          }
        ],
        heading2: [
          '1.75rem',
          {
            letterSpacing: '0rem',
            lineHeight: '2rem',
            fontWeight: '700'
          }
        ],
        heading3: [
          '1.5rem',
          {
            letterSpacing: '0rem',
            lineHeight: '2rem',
            fontWeight: '700'
          }
        ],
        heading4: [
          '1rem',
          {
            letterSpacing: '0.012rem',
            lineHeight: '3.5rem',
            fontWeight: '600'
          }
        ],
        heading5: [
          '0.875rem',
          {
            letterSpacing: '0.012rem',
            lineHeight: '3rem',
            fontWeight: '600'
          }
        ],
        label1: [
          '1.125rem',
          {
            lineHeight: '1.6875rem',
            letterSpacing: '0rem',
            fontWeight: '500'
          }
        ],
        label2: [
          '1rem',
          {
            lineHeight: '1.5rem',
            letterSpacing: '0rem',
            fontWeight: '500'
          }
        ],
        label3: [
          '0.875rem',
          {
            lineHeight: '1.25rem',
            letterSpacing: '0rem',
            fontWeight: '500'
          }
        ],
        label4: [
          '0.75rem',
          {
            lineHeight: '1.5rem',
            letterSpacing: '0rem',
            fontWeight: '500'
          }
        ],
        label5: [
          '0.6875rem',
          {
            lineHeight: '1rem',
            letterSpacing: '0rem',
            fontWeight: '500'
          }
        ],
        'body-large': [
          '1.125rem',
          {
            lineHeight: '1.5rem',
            letterSpacing: '0rem'
          }
        ],
        'body-medium': [
          '1rem',
          {
            lineHeight: '1.5rem',
            letterSpacing: '0rem'
          }
        ],
        'body-small': [
          '0.875rem',
          {
            lineHeight: '1.25rem',
            letterSpacing: '0rem'
          }
        ],
        'body-tiny': [
          '0.75rem',
          {
            lineHeight: '1rem',
            letterSpacing: '0rem'
          }
        ],
        'body-xs': [
          '0.6875rem',
          {
            lineHeight: '0.75rem',
            letterSpacing: '0rem'
          }
        ]
      }
    }
  },
  plugins: []
}
export default config

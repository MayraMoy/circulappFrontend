/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#16A085',
          light: '#48C9B0',
          dark: '#117A65',
        },
        secondary: {
          DEFAULT: '#F39C12',
          light: '#F8C471',
          dark: '#D68910',
        },
        accent: {
          DEFAULT: '#8E44AD',
          light: '#BB8FCE',
          dark: '#6C3483',
        },
        success: {
          DEFAULT: '#27AE60',
          light: '#58D68D',
          dark: '#1E8449',
        },
        warning: {
          DEFAULT: '#F1C40F',
          light: '#F7DC6F',
          dark: '#B7950B',
        },
        error: {
          DEFAULT: '#E74C3C',
          light: '#F1948A',
          dark: '#C0392B',
        },
        text: {
          primary: '#2C3E50',
          secondary: '#5D6D7E',
          disabled: '#BDC3C7',
        },
        background: {
          DEFAULT: '#F8F9FA',
          paper: '#FFFFFF',
          subtle: '#F1F3F5',
        },
        gray: {
          50: '#FAFBFC',
          100: '#F4F6F8',
          200: '#E9ECEF',
          300: '#DEE2E6',
          400: '#CED4DA',
          500: '#ADB5BD',
          600: '#6C757D',
          700: '#495057',
          800: '#343A40',
          900: '#212529',
        },
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #2C3E50 0%, #16A085 100%)',
        'gradient-accent': 'linear-gradient(135deg, #8E44AD, #BB8FCE)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 10px 25px rgba(0,0,0,0.05)',
        medium: '0 10px 30px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
}
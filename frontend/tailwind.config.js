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
          DEFAULT: '#234B3B', // Deep Luxury Emerald / Forest Green
          dark: '#18362A',
          light: '#2E634E',
          soft: '#EAF0EC'
        },
        secondary: {
          DEFAULT: '#F8F7F3', // Warm Off-White / Editorial Cream
          dark: '#EFECE4'
        },
        accent: {
          DEFAULT: '#D8C7A8', // Champagne / Warm Gold Sand
          light: '#EADFC9',
          dark: '#BBA580'
        },
        dark: {
          DEFAULT: '#252525', // Soft Charcoal / Jet Black
          muted: '#777777',
          subtle: '#9A9A9A'
        },
        border: {
          DEFAULT: '#E8E6E1',
          dark: '#D1CDC5'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.06)',
        'floating': '0 12px 36px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}

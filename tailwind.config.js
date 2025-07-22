/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5A00E0', // Deep Violet
        secondary: '#FF2D55', // Viral Pink
        accent: '#FCE83A', // Hype Yellow
        background: '#101010', // Dark Mode First
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Satoshi', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        card: '0 4px 32px 0 rgba(90,0,224,0.15), 0 1.5px 8px 0 #FF2D55',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};


module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './index.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1F2937', // Dark Gray
        secondary: '#111827', // Almost Black
        accent: '#3B82F6', // Blue
        accent2: '#10B981', // Green
        background: '#0F172A', // Dark Blue
        cardBg: '#1E293B', // Card Background
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

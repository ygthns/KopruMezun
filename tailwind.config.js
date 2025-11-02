/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        soft: '0 40px 80px -36px rgba(15, 23, 42, 0.35)',
      },
      backgroundImage: {
        'gradient-hero':
          'radial-gradient(circle at 20% 20%, rgba(79, 70, 229, 0.25), transparent 55%), radial-gradient(circle at 80% 30%, rgba(34, 211, 238, 0.18), transparent 55%)',
      },
    },
  },
  plugins: [],
};

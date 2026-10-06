/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,md,ts}'],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#4f9da8',
          dark: '#3b7d87',
          light: '#e3f1f3',
        },
        blush: {
          DEFAULT: '#ffebed',
          deep: '#ffd8db',
        },
        ink: '#313131',
        paper: '#FAFAFA',
      },
      fontFamily: {
        sans: ['Overpass', 'system-ui', 'sans-serif'],
        serif: ['Amiri', 'Georgia', 'serif'],
      },
      aspectRatio: {
        card: '520 / 400',
      },
    },
  },
  plugins: [],
};

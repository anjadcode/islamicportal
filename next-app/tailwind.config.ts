import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'islamic-green': {
          light: '#A3D2CA',
          DEFAULT: '#5EAAA8',
          dark: '#3A8885',
        },
        'islamic-white': '#F7F7F7', // Off-white for background
        'text-primary': '#333333',
        'text-secondary': '#555555',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'], // Example: Using Inter
      },
    },
  },
  plugins: [],
} satisfies Config;

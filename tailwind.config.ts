import type { Config } from "tailwindcss";
import textShadow from 'tailwindcss-textshadow';

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        jakarta: "Jakarta",
        "jakarta-bold": "Jakarta Bold",
      },
      colors: {
        'yellow': '#E1FF8B',
        'blue-100': '#B0F5FF',
        'blue-200': '#B0F5F0',
        'pink-100': '#DCD5FF',
        'pink-200': '#DCC4FF',
        'gray-100': '#C0C0C0',
        'gray-400': '#2E2E2E3B',
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        base: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [textShadow],
} satisfies Config;

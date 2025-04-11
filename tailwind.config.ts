import type { Config } from "tailwindcss";
import textShadow from 'tailwindcss-textshadow';
import scrollbarHide from 'tailwind-scrollbar-hide'

export default {
  purge: false,
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}", "./index.html", "./app/root.tsx", "./app/routes/_index.tsx",
    "./src/**/*.{js,jsx,ts,tsx,vue}", "app/styles/*"],
  theme: {
    extend: {
      fontFamily: {
        jakarta: "Jakarta",
        "jakarta-bold": '"Jakarta Bold"',
        "jakarta-extra-bold": '"Jakarta Extra Bold"',
        "made-brush": "MADE Soulmaze Brush",
        "made": "MADE",
      },
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
      colors: {
        'yellow': '#E1FF8B',
        'blue-100': '#B0F5FF',
        'blue-200': '#B0F5F0',
        'pink-100': '#DCD5FF',
        'pink-200': '#DCC4FF',
        'gray-50': '#DEDEDE',
        'gray-100': '#C0C0C0',
        'gray-200': '#BABABA',
        'gray-400': '#1d1d1d',
        'gray-500': '#1B1B1B',
        'gray-600': '#121212',
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        base: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },

      backgroundImage: {
        'gradient-custom': 'linear-gradient(90deg, rgba(27, 27, 27, 0.00) -3.01%, rgba(222, 254, 145, 0.04) 24.73%, rgba(181, 239, 255, 0.12) 49.8%, rgba(220, 196, 255, 0.12) 73.8%, rgba(27, 27, 27, 0.00) 102.68%)',
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0,8)',
        'inset-custom': 'inset 0px 0px 2px 0px rgba(191, 191, 191, 0.30)',
      },
      filter: {
        'drop-shadow-custom': 'drop-shadow(0px 0px 30px rgba(0, 0, 0, 0.40))',
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [textShadow, scrollbarHide],
} satisfies Config;

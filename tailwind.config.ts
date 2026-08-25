import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        clinic: {
          50: "#f0fbfa",
          100: "#d9f4f1",
          200: "#b3e8e3",
          300: "#7ed6ce",
          400: "#45bab0",
          500: "#279e95",
          600: "#1c7f78",
          700: "#1a6560",
          800: "#19514e",
          900: "#0e2f2d",
          950: "#081c1b"
        },
        blush: {
          400: "#f2b8c6",
          500: "#e893a8",
          600: "#d16b85"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "serif"]
      }
    }
  },
  plugins: []
};

export default config;

import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#07070B",
        pearl: "#F7F2EA",
        gold: {
          50: "#FFF8E7",
          100: "#FFEEC1",
          200: "#FFE197",
          300: "#FAD06A",
          400: "#F4BD3C",
          500: "#EAA81B",
          600: "#C98712",
          700: "#9B6411",
          800: "#6D4510",
          900: "#3C240B"
        }
      },
      fontFamily: {
        serif: ["ui-serif", "Georgia", "Cambria", "Times New Roman", "Times", "serif"],
        sans: ["ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"]
      },
      letterSpacing: {
        cinematic: "0.16em"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255, 255, 255, 0.08), 0 30px 90px rgba(0,0,0,0.55)"
      }
    }
  },
  plugins: []
} satisfies Config;


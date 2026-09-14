import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        page: "#F7F8FA",
        surface: "#FFFFFF",
        text: "#202522",
        muted: "#68716B",
        border: "#E3E7E3",
        orange: {
          DEFAULT: "#F47B20",
          hover: "#E86D13",
          soft: "#FFF0E3",
        },
        forest: {
          DEFAULT: "#203C32",
          hover: "#172E26",
        },
        "on-forest": "#FFFFFF",
        "muted-on-forest": "#D4DED8",
        success: "#2D6A49",
        error: "#B42318",
        primary: {
          DEFAULT: "#F47B20",
          hover: "#E86D13",
          light: "#FFF0E3",
        },
        dark: "#202522",
        gray: {
          DEFAULT: "#68716B",
          light: "#9CA3AF",
        },
        background: "#F7F8FA",
        footer: "#203C32",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "Arial", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
      borderRadius: {
        sm: "8px",
        control: "12px",
        image: "18px",
        panel: "20px",
        card: "24px",
        pill: "999px",
      },
      boxShadow: {
        card: "0 8px 28px rgba(32,37,34,.045)",
        "card-hover": "0 14px 36px rgba(32,37,34,.09)",
        float: "0 8px 30px rgba(15,30,22,.12)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;

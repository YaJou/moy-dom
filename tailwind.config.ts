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
        primary: {
          DEFAULT: "#F58220",
          hover: "#E76A00",
          light: "#FFF4EA",
        },
        dark: "#222222",
        gray: {
          DEFAULT: "#6B7280",
          light: "#9CA3AF",
        },
        background: "#FAFAFA",
        border: "#E8E8E8",
        footer: "#1A1A1A",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1440px",
      },
      borderRadius: {
        card: "18px",
      },
      boxShadow: {
        card: "0 12px 40px rgba(0,0,0,0.08)",
        cardHover: "0 16px 48px rgba(0,0,0,0.12)",
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
      spacing: {
        section: "80px",
      },
    },
  },
  plugins: [],
};

export default config;

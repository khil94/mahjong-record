import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        white: "var(--color-white)",
        black: "var(--color-black)",
        main: "var(--color-primary)",
        bgPrimary: "var(--color-background-primary)",
        bgSecondary: "var(--color-background-secondary)",
        border: "var(--color-border)",
        text: "var(--color-text)",
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/constants/**/*.{js,ts,jsx,tsx,mdx}",
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
        darkMain: "var(--color-dark-primary)",
        bgPrimary: "var(--color-background-primary)",
        bgSecondary: "var(--color-background-secondary)",
        border: "var(--color-border)",
        text: "var(--color-text)",
        bgOpp: "var(--color-background-opposite)",
        textOpp: "var(--color-text-opposite)",
        blue: "var(--color-blue)",
        green: "var(--color-green)",
        yellow: "var(--color-yellow)",
        red: "var(--color-red)",
      },
      screens: {
        sm: { max: "640px" },
        // => @media (min-width: 640px) { ... }
        md: { max: "768px" },
        // => @media (min-width: 768px) { ... }
        lg: { max: "1024px" },

        xlg: { max: "1440px" },

        msm: { min: "640px" },
        mmd: { min: "768px" },
        mlg: { min: "1024px" },
        mxlg: { min: "1440px" },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;

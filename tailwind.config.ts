import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#C3BDB9",
        ink: "#111111",
        electric: "#5CCBFF",
      },
    },
  },
  plugins: [],
};

export default config;

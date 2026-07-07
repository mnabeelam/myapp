import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#0c0818",
          raised: "#14102a",
          overlay: "#1e1838",
        },
        accent: {
          DEFAULT: "#00d4ff",
          hover: "#00b8e6",
          muted: "#0d2a3d",
          purple: "#8b5cf6",
          magenta: "#ec4899",
          indigo: "#6366f1",
        },
        status: {
          up: "#34d399",
          down: "#f87171",
          warn: "#fbbf24",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        "gradient-flow": "gradient-flow 8s ease infinite",
        "float-slow": "float-slow 12s ease-in-out infinite",
        "float-medium": "float-medium 9s ease-in-out infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        "mesh-shift": "mesh-shift 20s linear infinite",
      },
      boxShadow: {
        "3d-sm": "0 4px 0 rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.35)",
        "3d-md": "0 6px 0 rgba(0,0,0,0.45), 0 14px 40px rgba(0,0,0,0.4)",
        "3d-lg": "0 10px 0 rgba(0,0,0,0.5), 0 24px 60px rgba(0,0,0,0.45)",
        "glow-cyan": "0 0 30px rgba(0,212,255,0.35), 0 0 60px rgba(0,212,255,0.15)",
        "glow-purple": "0 0 30px rgba(139,92,246,0.35), 0 0 60px rgba(139,92,246,0.15)",
        "glow-magenta": "0 0 30px rgba(236,72,153,0.35), 0 0 60px rgba(236,72,153,0.15)",
      },
    },
  },
  plugins: [],
};

export default config;

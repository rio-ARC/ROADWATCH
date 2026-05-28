import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./features/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        asphalt: "#161308",
        "asphalt-deep": "#080704",
        "asphalt-panel": "#1f1b10",
        "asphalt-elevated": "#2e2a1e",
        "road-yellow": "#ffd700",
        "road-yellow-dim": "#e9c400",
        "road-cream": "#eae2cf",
        "road-muted": "#d0c6ab",
        "road-outline": "#4d4732",
        "alert-red": "#ff5a4f",
        "signal-blue": "#74a8ff"
      },
      fontFamily: {
        display: ["Montserrat", "Arial", "sans-serif"],
        body: ["Inter", "Arial", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "monospace"]
      },
      boxShadow: {
        civic: "0 18px 60px rgba(15, 23, 42, 0.12)",
        glow: "0 0 28px rgba(255, 215, 0, 0.22)",
        panel: "0 24px 80px rgba(0, 0, 0, 0.45)"
      },
      animation: {
        "pulse-glow": "pulse-glow 2.8s ease-in-out infinite",
        "scan-line": "scan-line 5s linear infinite"
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(255, 215, 0, 0.24)" },
          "50%": { boxShadow: "0 0 24px 4px rgba(255, 215, 0, 0.24)" }
        },
        "scan-line": {
          "0%": { transform: "translateY(-120%)", opacity: "0" },
          "35%, 65%": { opacity: "1" },
          "100%": { transform: "translateY(120%)", opacity: "0" }
        }
      }
    }
  },
  plugins: []
};

export default config;

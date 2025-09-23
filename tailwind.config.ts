import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // ISRAEL DESIGNS Brand Colors
        "brand-primary": "hsl(var(--brand-primary))",
        "brand-secondary": "hsl(var(--brand-secondary))", 
        "brand-accent": "hsl(var(--brand-accent))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        'brand': ['Inter', 'sans-serif'],
        'condensed': ['Oswald', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': 'var(--shadow-soft)',
        'float': 'var(--shadow-float)',
        'glow': '0 0 40px hsl(var(--brand-primary) / 0.4)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 0.8, 0.25, 1)',
        'spring': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
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
        "float": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(2deg)" },
        },
        "brandReveal": {
          from: {
            opacity: "0",
            transform: "translateY(50px) scale(0.8)",
            filter: "blur(10px)",
          },
          to: {
            opacity: "1", 
            transform: "translateY(0) scale(1)",
            filter: "blur(0)",
          },
        },
        "brandSlide": {
          to: { transform: "translate(-40vw, -40vh) scale(0.4)" },
        },
        "brandSlideNav": {
          to: { transform: "translate(40vw, -40vh) scale(0.3)" },
        },
        "splitLeft": {
          from: { 
            transform: "translateX(-100vw)",
            opacity: "0"
          },
          to: { 
            transform: "translateX(0)",
            opacity: "1"
          },
        },
        "splitRight": {
          from: { 
            transform: "translateX(100vw)",
            opacity: "0"
          },
          to: { 
            transform: "translateX(0)",
            opacity: "1"
          },
        },
        "parallaxSlide": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "shimmer": {
          "0%": { "background-position": "-200% 0" },
          "100%": { "background-position": "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out infinite 2s',
        'brand-reveal': 'brandReveal 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
        'brand-slide': 'brandSlide 1.5s cubic-bezier(0.25, 0.8, 0.25, 1) forwards 2.5s',
        'brand-slide-nav': 'brandSlideNav 1.5s cubic-bezier(0.25, 0.8, 0.25, 1) forwards 2.5s',
        'split-left': 'splitLeft 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
        'split-right': 'splitRight 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
        'parallax-slide': 'parallaxSlide 0.6s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

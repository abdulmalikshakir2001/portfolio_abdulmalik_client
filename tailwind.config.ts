import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    gridTemplateRows: {
      '70_30': '70% 30%',

      
    },

    fontSize:{

      '4.5xl': ['45px', {
        lineHeight: '40px',
        fontWeight: '700',
      }],
      '4.4xl': ['44px', {
        lineHeight: '55px',
        fontWeight: '700',
      }],
      's16_w600': ['16px', {
        lineHeight: '1',
        fontWeight: '600',
      }],
      's20_w500': ['20px', {
        lineHeight: '1',
        fontWeight: '500',
      }],
      's16_w500': ['16px', {
        lineHeight: '24px',
        fontWeight: '500',
      }],
      's16_w400': ['16px', {
        lineHeight: '24px',
        fontWeight: '400',
      }],
      's20_w700': ['20px', {
        lineHeight: '1',
        fontWeight: '700',
      }],
      's30_w600': ['30px', {
        lineHeight: '1',
        fontWeight: '600',
      }],
      's18_w600': ['18px', {
        lineHeight: '28px',
        fontWeight: '600',
      }],
      's18_w500': ['18px', {
        lineHeight: '28px',
        fontWeight: '500',
      }],
      's20_w600': ['20px', {
        lineHeight: '28px',
        fontWeight: '600',
      }],
      's24_w700': ['24px', {
        lineHeight: '32px',
        fontWeight: '700',
      }],

    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens:{
        'nsix':"960px",
        'ftwenty':"450px",
        'fiveh':"500px",
        'sevenh':"700px",
        'tfifty':"350px",

      },

      colors: {
        "royalBlue":"#4B6DF7",
        "customLightGray":"#959CB1",
        "customWhiteGray":"#F8F9FF",
        "customLitDarkGray":"#F8F8F9",
        "customDarkBlue":"#090E34",
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      
      spacing:{
        '87px':'87px'
      }
      
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
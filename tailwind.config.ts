import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: {
            DEFAULT: "#00B2C2",
            100: "#C9FBEF",
            200: "#95F8E8",
            300: "#5EECE1",
            400: "#36DADA",
            500: "#00B2C2",
            600: "#008BA6",
            700: "#00698B",
            800: "#004B70",
            900: "#00365D",
          },
          success: {
            DEFAULT: "#3C962E",
            100: "#E6F9D7",
            200: "#C9F4B0",
            300: "#9DDF82",
            400: "#71C05C",
            500: "#3C962E",
            600: "#268121",
            700: "#176C19",
            800: "#0E5716",
            900: "#084814",
          },
          warning: {
            DEFAULT: "#FFCC00",
            100: "#FFF9CC",
            200: "#FFF099",
            300: "#FFE666",
            400: "#FFDC3F",
            500: "#FFCC00",
            600: "#DBAA00",
            700: "#B78B00",
            800: "#936D00",
            900: "#7A5700",
          },
          danger:{
            DEFAULT: "#FF4B3A",
            100: "#FFE7D7",
            200: "#FFCAB0",
            300: "#FFA688",
            400: "#FF846B",
            500: "#FF4B3A",
            600: "#DB2B2A",
            700: "#B71D29",
            800: "#931227",
            900: "#7A0B25"
          }
        },
      },
      dark: {
        colors: {
          primary: {
            DEFAULT: "#006C76",
            100: "#C6F8EC",
            200: "#90F1E1",
            300: "#55D5CB",
            400: "#2BACAC",
            500: "#006C76",
            600: "#005465",
            700: "#003F54",
            800: "#002D44",
            900: "#002138",
          },
          success: {
            DEFAULT: "#2F9613",
            100: "#E4F9CE",
            200: "#C4F49F",
            300: "#94DF6A",
            400: "#66C042",
            500: "#2F9613",
            600: "#1E810D",
            700: "#106C09",
            800: "#065706",
            900: "#034809",
          },
          warning: {
            DEFAULT: "#BF8F00",
            100: "#FBF4C9",
            200: "#F8E795",
            300: "#EBCF5E",
            400: "#D8B436",
            500: "#BF8F00",
            600: "#A47600",
            700: "#895F00",
            800: "#6E4A00",
            900: "#5B3B00",
          },
          danger:{
            DEFAULT: "#CC435C",
            100: "#FAD2CD",
            200: "#F69F9E",
            300: "#E56A75",
            400: "#CC435C",
            500: "#AA123D",
            600: "#920D3F",
            700: "#7A093F",
            800: "#62053B",
            900: "#510338"
          }
        },
      }
    },
  })],
} satisfies Config;

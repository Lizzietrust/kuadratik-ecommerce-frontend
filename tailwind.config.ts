// tailwind.config.ts
import type { Config } from 'tailwindcss'
import scrollbarHide from 'tailwind-scrollbar-hide'
import tailwindScrollbar from 'tailwind-scrollbar'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        publicSans: ['var(--font-public-sans)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        hkGrotesk: ['var(--font-hk-grotesk)', 'sans-serif'],
      },
    },
  },
  plugins: [
    scrollbarHide,
    tailwindScrollbar({ nocompatible: true }),
  ],
}
export default config
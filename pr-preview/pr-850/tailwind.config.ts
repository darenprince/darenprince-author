import type { Config } from 'tailwindcss'

export default {
  content: ['nexuswho.html', 'src/nexuswho/**/*.{ts,tsx}', 'src/nexuswho/**/*.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config

/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'
import formsPlugin from '@tailwindcss/forms'

export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}'
  ],
  safelist: [
    {
      pattern: /^(bg|border|text|stroke|fill)-(stone|amber|orange|yellow|neutral|gray)-(50|100|200|300|400|500|600|700|800|900|950)$/
    }
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        tremor: {
          brand: {
            faint: '#f5f5f5',
            muted: '#e5e5e5',
            subtle: '#a3a3a3',
            DEFAULT: '#111111',
            emphasis: '#000000',
            inverted: colors.white
          },
          background: {
            muted: '#fafafa',
            subtle: '#f4f4f5',
            DEFAULT: '#ffffff',
            emphasis: '#171717'
          },
          border: { DEFAULT: '#e5e5e5' },
          ring: { DEFAULT: '#d4d4d4' },
          content: {
            subtle: '#a3a3a3',
            DEFAULT: '#737373',
            emphasis: '#404040',
            strong: '#0a0a0a',
            inverted: colors.white
          }
        },
        'dark-tremor': {
          brand: {
            faint: '#171717',
            muted: '#262626',
            subtle: '#737373',
            DEFAULT: '#f5f5f5',
            emphasis: '#ffffff',
            inverted: '#000000'
          },
          background: {
            muted: '#111111',
            subtle: '#171717',
            DEFAULT: '#000000',
            emphasis: '#f5f5f5'
          },
          border: { DEFAULT: '#262626' },
          ring: { DEFAULT: '#404040' },
          content: {
            subtle: '#737373',
            DEFAULT: '#a3a3a3',
            emphasis: '#d4d4d4',
            strong: '#fafafa',
            inverted: '#000000'
          }
        }
      }
    }
  },
  plugins: [formsPlugin]
}

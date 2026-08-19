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
    },
    ...['[#8f5d35]', '[#b97842]', '[#c6a16b]', '[#d9a06b]'].flatMap((customColor) => [
      `bg-${customColor}`,
      `border-${customColor}`,
      `hover:bg-${customColor}`,
      `hover:border-${customColor}`,
      `hover:text-${customColor}`,
      `fill-${customColor}`,
      `ring-${customColor}`,
      `stroke-${customColor}`,
      `text-${customColor}`,
      `ui-selected:bg-${customColor}`,
      `ui-selected:border-${customColor}`,
      `ui-selected:text-${customColor}`
    ])
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        tremor: {
          brand: {
            faint: '#f5eee8',
            muted: '#e6d5c5',
            subtle: '#c9a27d',
            DEFAULT: '#a86f3f',
            emphasis: '#7a4b29',
            inverted: colors.white
          },
          background: {
            muted: '#f7f7f6',
            subtle: '#f1f0ee',
            DEFAULT: '#ffffff',
            emphasis: '#2a2826'
          },
          border: { DEFAULT: '#e4e1dd' },
          ring: { DEFAULT: '#dedad5' },
          content: {
            subtle: '#a39d96',
            DEFAULT: '#706a64',
            emphasis: '#49443f',
            strong: '#171513',
            inverted: colors.white
          }
        },
        'dark-tremor': {
          brand: {
            faint: '#24160e',
            muted: '#4a2b1a',
            subtle: '#8f5d35',
            DEFAULT: '#b97842',
            emphasis: '#d9a06b',
            inverted: '#0a0a0a'
          },
          background: {
            muted: '#141210',
            subtle: '#191714',
            DEFAULT: '#0a0a0a',
            emphasis: '#d7d1ca'
          },
          border: { DEFAULT: '#292522' },
          ring: { DEFAULT: '#302b27' },
          content: {
            subtle: '#746d66',
            DEFAULT: '#a49c94',
            emphasis: '#d2cbc3',
            strong: '#f5f2ee',
            inverted: '#0a0a0a'
          }
        }
      }
    }
  },
  plugins: [formsPlugin]
}

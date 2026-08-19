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
      pattern: /^(bg|border|text|stroke|fill)-(blue|cyan|gray|emerald)-(50|100|200|300|400|500|600|700|800|900|950)$/
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
            faint: colors.blue[50],
            muted: colors.blue[200],
            subtle: colors.blue[400],
            DEFAULT: colors.blue[500],
            emphasis: colors.blue[700],
            inverted: colors.white
          },
          background: {
            muted: colors.gray[50],
            subtle: colors.gray[100],
            DEFAULT: colors.white,
            emphasis: colors.gray[700]
          },
          border: { DEFAULT: colors.gray[200] },
          ring: { DEFAULT: colors.gray[200] },
          content: {
            subtle: colors.gray[400],
            DEFAULT: colors.gray[500],
            emphasis: colors.gray[700],
            strong: colors.gray[900],
            inverted: colors.white
          }
        },
        'dark-tremor': {
          brand: {
            faint: '#0B1229',
            muted: colors.blue[950],
            subtle: colors.blue[800],
            DEFAULT: colors.blue[500],
            emphasis: colors.blue[400],
            inverted: colors.blue[950]
          },
          background: {
            muted: '#101722',
            subtle: '#111827',
            DEFAULT: '#0b1018',
            emphasis: colors.gray[300]
          },
          border: { DEFAULT: '#1f2937' },
          ring: { DEFAULT: '#1f2937' },
          content: {
            subtle: colors.gray[600],
            DEFAULT: colors.gray[400],
            emphasis: colors.gray[200],
            strong: colors.gray[50],
            inverted: colors.gray[950]
          }
        }
      }
    }
  },
  plugins: [formsPlugin]
}

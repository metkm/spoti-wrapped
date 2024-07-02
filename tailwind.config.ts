import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

export default <Partial<Config>>{
  theme: {
    extend: {
      aspectRatio: {
        auto: 'auto',
        square: '1 / 1',
        video: '16 / 9',
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [plugin(function ({ matchUtilities, theme }) {
    matchUtilities(
      {
        'text-shadow': value => ({
          textShadow: value,
        }),
      },
      { values: theme('textShadow') },
    )
  })],
}

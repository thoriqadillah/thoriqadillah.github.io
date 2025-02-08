const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'black': "#010002",
				'dark': '#242424',
				'darker': "#121212",
				'grey': "#37373780",
				'bright': '#f8efd4',
				'white': '#FFFFFF',
				'second': "#d7385e",
				'main': '#edc988'
			},
      fontFamily: {
        body: ['Geist Variable', ...defaultTheme.fontFamily.sans]
      }
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      })
    }
	],
}

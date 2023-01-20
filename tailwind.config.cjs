/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'dark': "#010002",
				'bright': '#f8efd4',
				'main': "#d7385e",
				'second': '#edc988'
			},
		},
	},
	plugins: [],
}

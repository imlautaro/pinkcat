import { colors } from '@unocss/preset-mini'

export default defineNuxtConfig({
	css: ['~/assets/css/styles.css'],
	extends: ['oxecore'],
	googleFonts: {
		families: {
			Inter: [400, 500, 700, 900],
		},
	},
	modules: ['@nuxtjs/google-fonts', '@nuxtjs/supabase'],
	srcDir: 'src',
	unocss: {
		shortcuts: {
			'text-primary': 'text-primary-300',
			'text-secondary': 'text-gray-600',
			'bg-primary': 'bg-primary-300',
		},
		theme: {
			colors: {
				primary: colors!.pink,
				gray: colors!.neutral,
			},
		},
	},
})

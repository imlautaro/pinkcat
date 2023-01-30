import { colors } from '@unocss/preset-mini'

export default defineNuxtConfig({
	build: {
		transpile: ['vuetify'],
	},
	css: [
		'~/assets/css/styles.css',
		'@mdi/font/css/materialdesignicons.css',
		'vuetify/styles',
	],
	extends: ['supauth'],
	googleFonts: {
		families: {
			Inter: [400, 500, 700, 900],
		},
	},
	modules: ['@nuxtjs/google-fonts', '@nuxtjs/supabase', 'nuxt-schema-org'],
	runtimeConfig: {
		public: {
			siteURL: 'http://localhost:3000',
		},
	},
	schemaOrg: {
		currency: 'ARS',
		host: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
		inLanguage: 'es-AR',
		title: 'PINKCAT | Tienda de artículos para amantes de los gatos',
	},
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

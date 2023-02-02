import { colors } from '@unocss/preset-mini'

export default defineNuxtConfig({
	css: ['~/assets/css/styles.css'],
	delayHydration: {
		mode: 'init',
	},
	extends: 'oxecore',
	googleFonts: {
		families: {
			Inter: [400, 500, 700, 900],
		},
	},
	image: {
		domains: ['tgwtpbjwrdhmwrlpvzzo.supabase.co'],
		screens: {
			'sm': 640,
			'md': 768,
			'lg': 1024,
			'xl': 1280,
			'2xl': 1536,
		},
	},
	imports: {
		dirs: ['stores', 'types'],
	},
	modules: [
		'@nuxtjs/google-fonts',
		'@nuxtjs/supabase',
		'nuxt-schema-org',
		'@pinia/nuxt',
		'@nuxt/image-edge',
		'nuxt-delay-hydration',
	],
	pinia: {
		autoImports: ['defineStore'],
	},
	runtimeConfig: {
		telegramAccessToken: process.env.TELEGRAM_ACCESS_TOKEN,
		public: {
			gtmContainerId: process.env.GTM_CONTAINER_ID,
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
		theme: {
			colors: {
				primary: colors!.pink,
				gray: colors!.neutral,
			},
		},
	},
})

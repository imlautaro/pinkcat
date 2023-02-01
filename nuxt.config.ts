export default defineNuxtConfig({
	build: {
		transpile: ['vuetify'],
	},
	css: ['@mdi/font/css/materialdesignicons.css', '~/assets/css/main.scss'],
	googleFonts: {
		families: {
			Roboto: [300, 400, 500, 600, 700, 800, 900],
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
	],
	pinia: {
		autoImports: ['defineStore'],
	},
	runtimeConfig: {
		telegramAccessToken: process.env.TELEGRAM_ACCESS_TOKEN,
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
})

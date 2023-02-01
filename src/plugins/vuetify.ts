import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
	components,
	directives,
	ssr: true,
})

export default defineNuxtPlugin(nuxtApp => {
	nuxtApp.vueApp.use(vuetify)
})

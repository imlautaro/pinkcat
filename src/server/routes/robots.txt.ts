export default defineEventHandler(event => {
	const runtimeConfig = useRuntimeConfig()

	const config = {
		'User-Agent': '*',
		'Disallow': '',
		'Sitemap': `${runtimeConfig.public.siteURL}/sitemap.xml`,
	}

	event.node.res.setHeader('Content-Type', 'text/plain')

	return Object.keys(config)
		.map(key => `${key}: ${config[key as keyof typeof config]}`)
		.join(`\n`)
})

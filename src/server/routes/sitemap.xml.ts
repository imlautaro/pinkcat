import { SitemapStream, streamToPromise } from 'sitemap'

export default defineEventHandler(async () => {
	const runtimeConfig = useRuntimeConfig()

	const sitemap = new SitemapStream({
		hostname: runtimeConfig.public.siteURL,
	})

	const pages = ['/']

	pages.forEach(page => {
		sitemap.write({
			url: page,
		})
	})

	sitemap.end()

	return streamToPromise(sitemap)
})

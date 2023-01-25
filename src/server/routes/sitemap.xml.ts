import { SitemapStream, streamToPromise } from 'sitemap'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async event => {
	const runtimeConfig = useRuntimeConfig()
	const supabase = serverSupabaseClient(event)

	const sitemap = new SitemapStream({
		hostname: runtimeConfig.public.siteURL,
	})

	const { data: products } = await supabase
		.from('products')
		.select(
			'id, name, price, image, visible, slug, parent:parent_id(name, price), category:category_id(name, slug)'
		)
		.eq('visible', 'true')

	products?.forEach(product => {
		sitemap.write({
			// @ts-ignore
			url: `/${product.category.slug}/${product.slug}`,
		})
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

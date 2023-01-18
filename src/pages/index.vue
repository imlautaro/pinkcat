<script setup lang="ts">
import { Database } from '~/database.types'
const supabase = useSupabaseClient<Database>()

interface Product {
	id: number
	name: string
	price?: number
	image?: string
	visible: boolean
	slug: string
	parent?: {
		name: string
		price: number
	}
	category: Category
}

const { data: products } = await useLazyAsyncData('products', async () => {
	const { data } = await supabase
		.from('products')
		.select(
			'id, name, price, image, visible, slug, parent:parent_id(name, price), category:category_id(name, slug)'
		)
		.eq('visible', 'true')
	return data as Product[]
})

interface Category {
	name: string
	slug: string
}

const categories = computed((): Category[] => {
	return (
		products.value?.reduce((p, c) => {
			if (!p.map(c => c.slug).includes(c.category.slug)) {
				p.push(c.category)
			}
			return p
		}, [] as Category[]) || []
	)
})
</script>

<template>
	<Head>
		<Title>PINKCAT | Tienda de artículos para amantes de los gatos</Title>
	</Head>
	<div class="min-h-screen">
		<Container v-if="products">
			<Stack v-for="category in categories" gap="12" vertical>
				<span class="text-2xl text-center md:text-left">
					{{ category.name }}
				</span>
				<div class="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-12">
					<Product
						v-for="product in products.filter(
							p => p.category.slug === category.slug
						)"
						class="col-span-6 sm:col-span-3 md:col-span-6 lg:col-span-4 xl:col-span-3"
						:name="product.name"
						:category_slug="product.category.slug"
						:extra="product.parent?.name"
						:price="product.price || product.parent?.price || 0"
						:image="product.image"
						:slug="product.slug"
					/>
					<div
						class="col-span-6 text-xl text-gray-400 sm:col-span-3 md:col-span-6 lg:col-span-4 xl:col-span-3 bg-gray-200 h-full rounded-md flex items-center justify-center p-12 text-center"
					>
						Más productos próximamente
					</div>
				</div>
			</Stack>
		</Container>
	</div>
</template>

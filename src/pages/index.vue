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
	<v-container v-if="products" class="py-16">
		<v-alert type="info" class="mb-16">
			Este sitio está siendo desarrollado, pero puedes explorar entre
			algunos productos, ver sus precios y realizar pedidos sin problemas.
		</v-alert>
		<div v-for="category in categories">
			<h2 class="text-h4 mb-8">Michi-{{ category.name }}</h2>
			<v-row>
				<v-col
					v-for="product in products.filter(
						p => p.category.slug === category.slug
					)"
					cols="12"
					sm="6"
					lg="4"
					xl="3"
				>
					<Product
						:price="product.price || product.parent?.price || 0"
						:name="product.name"
						:category="product.category.slug"
						:image="product.image || ''"
						:parent-name="product.parent?.name"
						:slug="product.slug"
					/>
				</v-col>
			</v-row>
		</div>
	</v-container>
</template>

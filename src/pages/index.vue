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

const runtimeConfig = useRuntimeConfig()
useHead(() => ({
	title: 'PINKCAT | Tienda de artículos para amantes de los gatos',
	meta: [
		{
			name: 'description',
			content:
				'Si sos fan de los gatos y te encanta tenerlos por todos lados, definitivamente este es el lugar indicado para vos',
		},
	],
	link: [
		{
			rel: 'canonical',
			href: `${runtimeConfig.public.siteURL}/`,
		},
	],
}))
</script>

<template>
	<div v-if="products">
		<Container
			v-for="category in categories"
			class="flex flex-col py-16 space-y-12"
		>
			<h2 class="text-4xl">Remeras de gatos</h2>
			<div class="grid grid-cols-6 md:grid-cols-12 gap-6">
				<div
					v-for="product in products.filter(
						product => product.category.slug === category.slug
					)"
					class="col-span-6 lg:col-span-4 2xl:col-span-3"
				>
					<Product
						:price="product.price || product.parent?.price || 0"
						:name="product.name"
						:category="product.category.slug"
						:image="product.image || ''"
						:parent-name="product.parent?.name"
						:slug="product.slug"
					/>
				</div>
			</div>
		</Container>
	</div>
</template>

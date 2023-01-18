<script setup lang="ts">
const supabase = useSupabaseClient()
const route = useRoute()

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
}

const { data: product } = await useLazyAsyncData(
	`product-${route.params.product_slug}`,
	async () => {
		const { data } = await supabase
			.from('products')
			.select(
				'id, name, price, image, visible, slug, parent:parent_id(name, price)'
			)
			.eq('slug', route.params.product_slug)
			.single()
		return data as Product
	}
)

const { data: products } = await useLazyAsyncData(
	`recommended-products-${route.params.product_slug}`,
	async () => {
		const { data } = await supabase
			.from('products')
			.select(
				'id, name, price, image, visible, slug, parent:parent_id(name, price)'
			)
			.not('slug', 'eq', route.params.product_slug)
			.limit(3)
		return data as Product[]
	}
)
</script>

<template>
	<div v-if="product">
		<Head>
			<Title>
				{{ product.parent ? product.parent.name + ' - ' : ''
				}}{{ product.name }}
			</Title>
		</Head>
		<Container class="flex flex-col space-y-12" max="lg">
			<NuxtLink to="/"> &leftarrow; Volver al inicio </NuxtLink>
			<Card>
				<div class="grid grid-cols-6 md:grid-cols-12">
					<div class="col-span-6">
						<img :src="product.image" />
					</div>
					<div
						class="col-span-6 flex flex-col space-y-6 md:(items-start p-12 text-left) text-center p-6"
					>
						<Stack gap="1" vertical>
							<h1 class="text-2xl">
								{{ product.name }}
							</h1>
							<span class="text-secondary">
								{{ product.parent?.name }}
							</span>
						</Stack>
						<span>
							$
							{{
								product.parent
									? product.parent.price
									: product.price
							}}
						</span>
						<Stack
							class="bg-sky-600/10 p-4 text-sky-900 rounded-md text-left"
							gap="2"
							vertical
						>
							<Icon name="ion:information-circle" />
							<p>
								Recién estamos empezando y nos alegra tenerte
								acá, pero por el momento no tenemos habilitadas
								las compras desde esta plataforma. Si te gustó
								este artículo y te gustaría comprarlo podés
								enviarnos un mensaje por Instagram.
							</p>
						</Stack>
						<NuxtLink
							class="bg-primary font-medium px-5 py-3 rounded-md text-lg"
							to="https://instagram.com/pinkcatok"
						>
							Ir a Instagram
						</NuxtLink>
					</div>
				</div>
			</Card>
			<h3 class="text-2xl text-center">Más productos</h3>
			<div
				v-if="products"
				class="grid grid-cols-6 md:grid-cols-12 gap-12"
			>
				<Product
					class="col-span-6 md:col-span-4"
					v-for="product in products"
					:name="product.name"
					:extra="product.parent?.name"
					:price="product.price || product.parent?.price || 0"
					:image="product.image"
					:slug="product.slug"
				/>
			</div>
		</Container>
	</div>
</template>

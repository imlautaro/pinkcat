<script setup lang="ts">
const supabase = useSupabaseClient()
const route = useRoute()

interface Size {
	[key: string]: string
}

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
		sizes?: string
	}
	category: {
		name: string
		slug: string
	}
	sizes?: string
}

const { data: product } = await useLazyAsyncData(
	`product-${route.params.product_slug}`,
	async () => {
		const { data } = await supabase
			.from('products')
			.select(
				'id, name, price, image, visible, slug, parent:parent_id(name, price, sizes), category:category_id(name, slug), sizes'
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
				'id, name, price, image, visible, slug, parent:parent_id(name, price), category:category_id(name, slug)'
			)
			.not('slug', 'eq', route.params.product_slug)
			.limit(3)
		return data as Product[]
	}
)

const sizes = computed(() =>
	JSON.parse(product.value?.sizes || product.value?.parent?.sizes || '[]')
)

const size = ref('S')

const createOrder = ref(false)

const name = computed(() => {
	if (product.value) {
		if (product.value.parent) {
			return `${product.value.parent.name} - ${product.value.name}`
		}
		return product.value.name
	}
	return ''
})

defineProduct({
	name: name.value,
	image: product.value?.image || '',
	offers: [
		{
			price: product.value?.price || product.value?.parent?.price || 0,
			priceCurrency: 'ARS',
		},
	],
})
</script>

<template>
	<div v-if="product">
		<Head>
			<Title>
				{{ product.parent ? product.parent.name + ' - ' : ''
				}}{{ product.name }}
			</Title>
		</Head>
		<v-container>
			<div class="d-flex align-center justify-space-between">
				<v-btn
					class="mb-8"
					prepend-icon="mdi-arrow-left"
					variant="text"
					to="/"
				>
					Volver al inicio
				</v-btn>
			</div>
			<v-card class="mb-8" rounded="xl" border variant="flat">
				<v-row>
					<v-col cols="12" md="6">
						<v-img :src="product.image" />
					</v-col>
					<v-col
						class="d-flex flex-column align-start py-16 px-8"
						cols="12"
						md="6"
					>
						<span class="text-h5">{{ product.name }}</span>
						<span class="text-medium-emphasis">{{
							product.parent?.name
						}}</span>

						<span class="my-8 text-h4">
							${{
								product.parent
									? product.parent.price
									: product.price
							}}
						</span>

						<div
							class="d-flex flex-column align-start"
							style="width: 100%"
						>
							<v-select
								:items="sizes"
								item-value="Talle"
								item-title="Talle"
								label="Talle"
								variant="outlined"
								hide-details
								v-model="size"
								class="mb-2"
							/>
							<v-dialog>
								<template #activator="{ props }">
									<button
										v-bind="props"
										class="text-body-2 text-pink"
									>
										Ver guía de talles
									</button>
								</template>
								<v-card>
									<tshirt-sizes />
								</v-card>
							</v-dialog>
						</div>

						<div
							v-if="false && sizes"
							class="d-flex flex-column align-start"
						>
							<span>Talles</span>
							<v-btn-toggle
								class="my-2"
								color="pink"
								variant="outlined"
								mandatory
								v-model="size"
							>
								<v-btn v-for="size in sizes">
									{{ size[Object.keys(size)[0]] }}
								</v-btn>
							</v-btn-toggle>
						</div>

						<div class="d-flex align-center my-8">
							<v-icon class="mr-1">mdi-tree-outline</v-icon>
							<span class="text-body-2">100% algodón</span>
						</div>

						<div class="d-flex align-center">
							<v-dialog
								v-model="createOrder"
								fullscreen
								transition="dialog-bottom-transition"
							>
								<template #activator="{ props }">
									<v-btn
										color="pink-lighten-4"
										size="large"
										variant="flat"
										append-icon="mdi-chevron-right"
										rounded="lg"
										v-bind="props"
									>
										Realizar pedido
									</v-btn>
								</template>
								<v-card>
									<v-toolbar dark color="pink-lighten-4">
										<v-btn
											icon="mdi-close"
											@click="createOrder = false"
										/>
										<v-toolbar-title>
											Realizar pedido
										</v-toolbar-title>
									</v-toolbar>
									<CreateOrderForm
										:product="product"
										:size="size"
									/>
								</v-card>
							</v-dialog>
						</div>
					</v-col>
				</v-row>
			</v-card>
			<span class="text-h5">Más productos</span>
			<v-row class="mt-4">
				<v-col v-for="product in products" cols="12" lg="4">
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
		</v-container>
	</div>
</template>

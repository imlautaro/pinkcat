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
			.limit(4)
		return data as Product[]
	}
)

const sizes = computed(() =>
	JSON.parse(product.value?.sizes || product.value?.parent?.sizes || '[]')
)

const validateUsername = (username: string) => {
	return /^([a-z0-9\.\_])*$/.test(username) && /[^\.]$/.test(username)
}

const size = ref('S')

const igUsername = ref('')
const firstName = ref('')
const pending = ref(false)
const error = ref(false)
const isValid = reactive({
	igUsername: null as null | boolean,
	firstName: null as null | boolean,
})

watch(igUsername, value => {
	igUsername.value = igUsername.value.toLowerCase().replace(' ', '')
	if (!value) {
		isValid.igUsername = null
	} else {
		isValid.igUsername = validateUsername(value)
	}
})

watch(firstName, value => {
	isValid.firstName = value ? true : null
})

const showCreateOrderForm = ref(false)

const showDoneMessage = ref(false)

const createOrder = async () => {
	if (!isValid.firstName || !isValid.igUsername) return

	pending.value = true

	try {
		await $fetch('/api/create-order', {
			method: 'POST',
			body: {
				product: product.value,
				size: size.value,
				name: firstName.value,
				ig_username: igUsername.value,
			},
		})
		firstName.value = ''
		isValid.firstName = null
		igUsername.value = ''
		isValid.igUsername = null
		showCreateOrderForm.value = false
		showDoneMessage.value = true
	} catch {
		error.value = true
	}

	pending.value = false
}

const name = computed(() => {
	if (product.value) {
		if (product.value.parent) {
			return `${product.value.parent.name} - ${product.value.name}`
		}
		return product.value.name
	}
	return ''
})

const showSizesGuide = ref(false)

const runtimeConfig = useRuntimeConfig()

useHead(() => ({
	title: `${
		product.value?.parent?.name && product.value.parent.name + ' - '
	}${product.value?.name || 'Cargando...'}`,
	meta: [
		{
			name: 'description',
			content:
				'Mirá esta hermosa Michi-Remera que diseñamos para todos aquellos fanáticos de los felinos que aman tenerlos siempre presentes en todos lados',
		},
		{
			name: 'theme-color',
			content:
				showSizesGuide.value ||
				showCreateOrderForm.value ||
				showDoneMessage.value
					? '#404040'
					: '#ffffff',
		},
	],
	link: [
		{
			rel: 'canonical',
			href: `${runtimeConfig.public.siteURL}/${route.params.category_slug}/${route.params.product_slug}`,
		},
	],
}))

useSchemaOrg([
	defineProduct({
		name: name.value,
		image: product.value?.image || '',
		offers: [
			{
				price:
					product.value?.price || product.value?.parent?.price || 0,
				priceCurrency: 'ARS',
			},
		],
	}),
])
</script>

<template>
	<div v-if="product">
		<Container
			class="grid grid-cols-6 md:grid-cols-12 gap-6 items-center px-6"
		>
			<!-- Product Image -->
			<div class="col-span-6">
				<nuxt-img
					sizes="sm:100vw md:348px lg:476px xl:604px 2xl:732px"
					:src="product.image"
					:alt="
						product.parent?.name
							? `${product.parent.name} - ${product.name}`
							: product.name
					"
					format="webp"
				/>
			</div>
			<!-- Product Information -->
			<Stack
				class="col-span-6 py-12 md:py-24 lt-md:border-t"
				gap="8"
				vertical
			>
				<Stack gap="6" vertical>
					<!-- Breadcrumb -->
					<Stack class="text-gray-600 text-sm" gap="2" items="center">
						<NuxtLink
							class="bg-gray-100 hover:text-gray-900 px-3 py-1.5 rounded-lg"
							to="/"
						>
							Página de inicio
						</NuxtLink>
						<Icon name="heroicons:chevron-right-20-solid" />
						<span>Remeras</span>
					</Stack>
					<Stack vertical>
						<h1 class="font-medium text-2xl">
							{{ product.name }}
						</h1>
						<span v-if="product.parent" class="text-gray-600">
							{{ product.parent.name }}
						</span>
					</Stack>
				</Stack>
				<span class="text-4xl">
					${{ product.parent?.price || product.price }}
				</span>
				<Stack gap="6" vertical>
					<Stack v-if="false" gap="2" vertical>
						<span class="text-sm">Color</span>
						<Stack gap="3">
							<div
								class="bg-white border h-8 rounded-full w-8 ring-2 ring-offset-2 ring-primary-300"
							/>
							<div class="bg-black border h-8 rounded-full w-8" />
						</Stack>
					</Stack>
					<Stack gap="2" vertical>
						<span class="text-sm">Talle</span>
						<Stack
							class="bg-gray-100 font-medium p-1 rounded-2xl text-sm sm:w-min"
							gap="1"
						>
							<button
								v-for="s in sizes"
								@click="size = s[Object.keys(s)[0]]"
								class="duration-200 px-4 py-3 rounded-xl w-full"
								:class="
									size === s[Object.keys(s)[0]]
										? 'bg-white shadow text-primary-600'
										: 'hover:text-gray-900 text-gray-600'
								"
							>
								{{ s[Object.keys(s)[0]] }}
							</button>
						</Stack>
						<button
							@click="showSizesGuide = true"
							class="font-medium text-primary-600 text-xs w-min whitespace-nowrap"
						>
							Ver guía de talles
						</button>
					</Stack>
					<Stack gap="2" vertical>
						<span class="text-sm">Informacion extra</span>
						<Stack
							class="bg-gray-100 p-6 rounded-2xl md:w-min"
							gap="4"
							vertical
						>
							<Stack
								class="text-gray-600 text-sm whitespace-nowrap"
								gap="2"
								items="center"
							>
								<Icon name="fluent-mdl2:cotton" />
								<span>100% algodón</span>
							</Stack>
						</Stack>
					</Stack>
				</Stack>
				<hr />
				<Button
					@click="showCreateOrderForm = true"
					icon="heroicons:chevron-right"
					block
					class="sm:w-min"
				>
					Hacer un pedido
				</Button>
			</Stack>
		</Container>
		<Transition name="backdrop">
			<button
				v-if="showSizesGuide"
				@click="showSizesGuide = false"
				class="fixed top-0 left-0 bg-black/75 w-full h-full"
			/>
		</Transition>
		<Transition name="dialog">
			<div
				v-if="showSizesGuide"
				class="bg-white grid grid-cols-6 lt-md:(overflow-y-auto) items-center fixed bottom-0 left-0 w-full h-min rounded-t-3xl md:(grid-cols-12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl max-w-screen-md)"
				style="max-height: 80vh"
			>
				<div class="col-span-6 p-6 lt-md:pb-0 md:(pr-4 p-8)">
					<nuxt-img
						class="mx-auto lt-md:w-64"
						src="/tshirt-sizes-guide.png"
						sizes="sm:256px md:336px"
						alt="Guía para tomar medidas a una remera"
						format="webp"
					/>
				</div>
				<Stack class="col-span-6 p-6 md:(pl-4 p-8)" gap="6" vertical>
					<TshirtSizes />
					<Stack class="text-sm" gap="2" vertical>
						<p>
							<b class="text-red-600">Sisa</b>: Esta medida se
							toma de axila a axila (altura del busto).
						</p>
						<p>
							<b class="text-blue-600">Largo</b>: Esta medida se
							toma del hombro hasta el final de la prenda.
						</p>
					</Stack>
				</Stack>
			</div>
		</Transition>
		<Transition name="backdrop">
			<button
				v-if="showCreateOrderForm"
				@click="showCreateOrderForm = false"
				class="fixed top-0 left-0 bg-black/75 w-full h-full"
			/>
		</Transition>
		<Transition name="dialog">
			<div
				v-if="showCreateOrderForm"
				class="bg-white grid grid-cols-6 lt-md:(overflow-y-auto) items-center fixed bottom-0 left-0 w-full h-min rounded-t-3xl md:(grid-cols-12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl max-w-screen-md)"
				style="max-height: 80vh"
			>
				<Stack
					class="col-span-6 p-6 lt-md:(border-b) md:(p-8) h-full border-r"
					justify="between"
					vertical
				>
					<nuxt-img
						width="319px"
						height="319px"
						class="hidden md:flex"
						:src="product.image"
						:alt="
							product.parent?.name
								? `${product.parent.name} - ${product.name}`
								: product.name
						"
						format="webp"
					/>
					<Stack items="center" justify="between">
						<Stack vertical>
							<span class="font-medium">{{ product.name }}</span>
							<span
								v-if="product.parent"
								class="text-sm text-gray-600"
							>
								{{ product.parent?.name }} &middot; Talle
								{{ size }}
							</span>
						</Stack>
						<span
							class="bg-gray-100 font-medium px-4 py-2 rounded-full"
						>
							${{ product.price || product.parent?.price }}
						</span>
					</Stack>
				</Stack>
				<Stack class="col-span-6 p-6 md:(p-8)" gap="6" vertical>
					<Stack gap="2" vertical>
						<label class="text-sm">Nombre</label>
						<div class="relative">
							<Icon
								class="absolute left-4 top-1/2 text-sm -translate-y-1/2 text-gray-600"
								name="heroicons:user-20-solid"
							/>
							<input
								v-model="firstName"
								class="bg-gray-100 pl-12 px-5 py-4 w-full rounded-2xl"
								type="text"
								placeholder="Ej: Usuario"
							/>
							<Icon
								v-if="isValid.firstName === true"
								class="text-green-600 absolute right-4 top-1/2 -translate-y-1/2"
								name="heroicons:check-circle"
							/>
						</div>
					</Stack>
					<Stack gap="2" vertical>
						<label class="text-sm">Usuario de Instagram</label>
						<div class="relative">
							<Icon
								class="absolute left-4 top-1/2 text-sm -translate-y-1/2 text-gray-600"
								name="heroicons:at-symbol-20-solid"
							/>
							<input
								class="bg-gray-100 pl-12 px-5 py-4 w-full rounded-2xl"
								type="text"
								placeholder="Ej: usuario"
								v-model="igUsername"
							/>
							<Icon
								v-if="isValid.igUsername === true"
								class="text-green-600 absolute right-4 top-1/2 -translate-y-1/2"
								name="heroicons:check-circle"
							/>
							<Icon
								v-else-if="isValid.igUsername === false"
								class="text-red-600 absolute right-4 top-1/2 -translate-y-1/2"
								name="heroicons:exclamation-circle"
							/>
						</div>
					</Stack>
					<Stack
						class="border-t flex flex-col pt-6 px-6 -mx-6 md:(px-8 -mx-8) space-y-2"
						vertical
					>
						<span class="font-bold">Sistema de pedidos</span>
						<p class="text-sm text-gray-600">
							Una vez que realices el pedido, te vamos a contactar
							por Instagram dentro de las próximas horas para
							concretar la compra.
						</p>
					</Stack>
					<Button
						@click="createOrder"
						:pending="pending"
						icon="heroicons:paper-airplane"
						block
					>
						Enviar
					</Button>
				</Stack>
			</div>
		</Transition>
		<Transition name="backdrop">
			<button
				v-if="showDoneMessage"
				@click="showDoneMessage = false"
				class="fixed top-0 left-0 bg-black/75 w-full h-full"
			/>
		</Transition>
		<Transition name="dialog">
			<div
				v-if="showDoneMessage"
				class="bg-white flex flex-col p-8 text-center space-y-4 lt-md:(overflow-y-auto) items-center fixed bottom-0 left-0 w-full h-min rounded-t-3xl md:(top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl max-w-screen-md)"
				style="max-height: 80vh"
			>
				<Icon
					class="text-4xl text-green-600"
					name="fluent-emoji:grinning-cat"
				/>
				<span>
					Listo, dentro de poco te vamos a estar enviando un mensaje.
				</span>
			</div>
		</Transition>
		<div class="bg-gray-100 border-t">
			<Container
				class="grid grid-cols-6 md:grid-cols-12 gap-6 px-6 py-12"
			>
				<div class="col-span-6 md:col-span-12 text-2xl">
					Mas productos
				</div>
				<div
					v-for="product in products"
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
			</Container>
		</div>
	</div>
</template>

<style>
.backdrop-enter-active,
.backdrop-leave-active {
	@apply duration-200;
}
.backdrop-enter-from,
.backdrop-leave-to {
	@apply opacity-0;
}

.dialog-enter-active,
.dialog-leave-active {
	@apply duration-500;
}
.dialog-enter-from,
.dialog-leave-to {
	@apply translate-y-full;
}

@media (min-width: 768px) {
	.dialog-enter-active,
	.dialog-leave-active {
		@apply duration-200;
	}
	.dialog-enter-from,
	.dialog-leave-to {
		@apply opacity-0 scale-95 -translate-y-1/2;
	}
}
</style>

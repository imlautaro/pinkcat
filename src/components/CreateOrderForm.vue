<script setup lang="ts">
const props = defineProps<{
	product: Product
	size: string
}>()

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

const supabase = useSupabaseClient()

const name = ref('')
const igUsername = ref('')

const pending = ref(false)

const error = ref(false)
const success = ref(false)

const createOrder = async () => {
	if (!name.value || /^([a-z0-9\.\_])*$/.test(igUsername.value)) return

	pending.value = true

	try {
		await $fetch('/api/create-order', {
			method: 'POST',
			body: {
				product: props.product,
				size: props.size,
				name: name.value,
				ig_username: igUsername.value,
			},
		})
		success.value = true
	} catch {
		error.value = true
	}

	// const { error: err } = await supabase.from('orders').insert({
	// 	// @ts-ignore
	// 	product_id: props.product.id,
	// 	size: props.size,
	// 	name: name.value,
	// 	ig_username: igUsername.value,
	// })

	// if (err) {
	// 	error.value = true
	// } else {
	// 	await $fetch('/api/telegram')
	// 	success.value = true
	// }

	pending.value = false
}
</script>

<template>
	<v-form @submit.prevent="createOrder" class="pa-6">
		<v-card
			border
			variant="flat"
			rounded="lg"
			class="d-flex align-center mb-8"
		>
			<v-avatar size="128">
				<v-img :src="product.image" />
			</v-avatar>
			<div class="py-6 px-6">
				<p>{{ product.name }}</p>
				<p
					class="text-medium-emphasis text-body-2"
					v-if="product.parent?.name"
				>
					{{ product.parent.name }}
				</p>
				<p class="text-h6 my-2">
					${{ product.price || product.parent?.price }}
				</p>
				<v-chip color="pink"> Talle {{ size }} </v-chip>
			</div>
		</v-card>
		<v-alert class="mb-8" v-if="error" type="error">
			Ha ocurrido un error
		</v-alert>
		<v-alert class="mb-8" v-if="success" type="success">
			Listo, dentro de poco te vamos a estar enviando un mensaje.
		</v-alert>
		<v-text-field
			prepend-icon="mdi-account"
			label="Nombre"
			variant="outlined"
			hint="Ejemplo: Ariana"
			:rules="[n => !!n || 'Este campo es requerido']"
			persistent-hint
			class="mb-6"
			type="text"
			v-model="name"
		/>
		<v-text-field
			prepend-icon="mdi-at"
			label="Usuario de Instagram"
			hint="Ejemplo: @arianagrande"
			type="text"
			persistent-hint
			:rules="[
				n =>
					/^([a-z0-9\.\_])*$/.test(n) ||
					'Por favor, ingresá un nombre de usuario válido',
			]"
			class="mb-6"
			variant="outlined"
			v-model="igUsername"
		/>
		<div class="bg-grey-lighten-3 pa-6 my-4 rounded-lg d-flex flex-column">
			<span class="text-body-1 font-weight-bold mb-2">
				Sistema de pedidos
			</span>
			<p class="text-body-2">
				Una vez que realices el pedido, te vamos a contactar por
				Instagram dentro de las próximas horas para concretar la compra.
			</p>
			<div class="d-flex mt-5 pl-1 text-body-2">
				<v-icon class="mr-2">mdi-truck</v-icon>
				Envíos a partir de $500 (PBA y CABA)
			</div>
		</div>
		<v-btn
			type="submit"
			color="pink-lighten-4"
			variant="flat"
			size="large"
			append-icon="mdi-send"
			block
			rounded="lg"
			:loading="pending"
		>
			Enviar
		</v-btn>
	</v-form>
</template>

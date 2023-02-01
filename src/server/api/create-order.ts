export default defineEventHandler(async event => {
	const body = await readBody(event)
	const { telegramAccessToken } = useRuntimeConfig()

	const api = `https://api.telegram.org/bot${telegramAccessToken}`

	// const res = await $fetch(`/getUpdates`, { baseURL: api })

	// console.log(res)

	try {
		const result = await $fetch('/sendMessage', {
			baseURL: api,
			method: 'POST',
			body: {
				chat_id: '517931898',
				parse_mode: 'markdown',
				text: `🔔 *Nueva órden de compra*

Producto:
• ID: *${body.product.id}*
• Nombre: [${body.product.name}](https://pinkcat.shop/${
					body.product.category.slug
				}/${body.product.slug})
• Precio: *AR\$${body.product.price || body.product.parent.price}*
• Talle: *${body.size}*

Comprador:
• Nombre: *${body.name}*
• Instagram: [@${body.ig_username}](https://instagram.com/${body.ig_username})`,
			},
		})
		return result
	} catch (error) {
		console.error(error)
		throw new Error('An error ocurred')
	}
})

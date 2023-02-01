export default defineStore('cart', {
	state: () => ({
		items: [] as Item[],
	}),
	actions: {
		addItem(product: Product) {
			this.items.push({
				...product,
				quantity: 1,
			})
		},
		addUnit(productId: number) {
			const product = this.getById(productId)
			if (product) {
				product.quantity++
			}
		},
		removeUnit(productId: number) {
			const product = this.getById(productId)
			if (product) {
				if (product.quantity > 1) {
					product.quantity--
				} else {
					this.removeItem(productId)
				}
			}
		},
		removeItem(productId: number) {
			const product = this.items.findIndex(
				product => product.id === productId
			)
			if (product !== -1) {
				this.items.splice(product, 1)
			}
		},
		save() {
			localStorage.setItem('cart', JSON.stringify(this.$state))
		},
		restore() {
			const saved = localStorage.getItem('cart')
			if (saved) {
				this.$patch(JSON.parse(saved))
			}
		},
	},
	getters: {
		getById: state => {
			return (productId: number) =>
				state.items.find(product => product.id === productId)
		},
		isEmpty: state => !state.items.length,
		total: state => {
			return state.items.reduce(
				(total, product) => total + product.price * product.quantity,
				0
			)
		},
	},
})

interface Product {
	id: number
	name: string
	price: number
}

interface Item extends Product {
	quantity: number
}

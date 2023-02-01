export interface Product {
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

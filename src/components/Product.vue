<script setup lang="ts">
defineProps<{
	price: number
	name: string
	parentName?: string
	image: string
	category: string
	slug: string
}>()
</script>

<template>
	<v-card :to="`/${category}/${slug}`" rounded="xl" border variant="flat">
		<v-img :src="image" />
		<div class="d-flex align-center justify-space-between px-6 py-6">
			<div class="d-flex flex-column">
				<span class="text-body font-weight-bold">
					{{ name }}
				</span>
				<span
					v-if="parentName"
					class="text-body-2 text-medium-emphasis"
				>
					{{ parentName }}
				</span>
			</div>
			<v-chip> AR${{ price }} </v-chip>
		</div>
		<!--
        <v-row dense class="px-2 pb-2 pt-1 border-t">
            <v-col cols="12" md="6">
                <v-btn
                    prepend-icon="mdi-cart-plus"
                    block
                    color="primary"
                    variant="text"
                >
                    Añadir
                </v-btn>
            </v-col>
            <v-col cols="12" md="6">
                <v-btn
                    prepend-icon="mdi-eye"
                    block
                    variant="text"
                    :to="`/${product.category.slug}/${product.slug}`"
                >
                    Ver detalles
                </v-btn>
            </v-col>
        </v-row>
        -->
	</v-card>
</template>

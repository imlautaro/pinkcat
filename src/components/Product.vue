<script setup lang="ts">
defineProps<{
	isNew?: boolean
	rating?: number
	image?: string
	name: string
	extra?: string
	price: number
	slug: string
	category_slug: string
}>()

const liked = ref(false)
</script>

<template>
	<NuxtLink
		class="bg-white duration-200 flex flex-col justify-between group rounded-md shadow md:hover:(-translate-y-2 shadow-lg)"
		:to="`/${category_slug}/${slug}`"
	>
		<Stack class="px-6 pt-6" items="center">
			<Stack
				v-if="rating"
				class="text-xs text-gray-600"
				gap="1"
				items="center"
			>
				<Icon class="text-primary-300" name="heroicons:star-20-solid" />
				<span class="font-bold">
					{{ rating.toString().replace('.', ',') }}
				</span>
			</Stack>
			<span
				v-if="isNew"
				class="bg-primary-300 font-medium ml-auto px-2 text-xs py-1 rounded-full"
			>
				Nuevo
			</span>
		</Stack>
		<img v-if="image" :src="image" />
		<Stack
			class="duration-200 md:(group-hover:bg-gray-900 text-white mx-4 mb-4 pl-3 pr-6 py-3) pl-3 pr-6 py-4 rounded"
			items="center"
			justify="between"
			gap="4"
		>
			<Stack class="flex-1 overflow-hidden" gap="2" items="center">
				<button
					v-if="false"
					@click="liked = !liked"
					class="duration-100 hover:bg-white/5 active:bg-white/10 flex p-2 rounded-full"
				>
					<Icon
						:class="{
							'text-primary': liked,
						}"
						:name="liked ? 'ion:heart' : 'ion:heart-outline'"
					/>
				</button>
				<Stack
					class="duration-200 md:(opacity-0 group-hover:opacity-100) flex-1 overflow-hidden"
					vertical
				>
					<span
						class="font-medium overflow-hidden whitespace-nowrap"
						style="text-overflow: ellipsis"
					>
						{{ name }}
					</span>
					<span
						v-if="extra"
						class="text-gray-600 md:text-gray-400 text-xs"
					>
						{{ extra }}
					</span>
				</Stack>
			</Stack>
			<span
				class="duration-200 ml-auto text-lg text-gray-900 md:group-hover:text-white"
			>
				$ {{ price }}
			</span>
		</Stack>
	</NuxtLink>
</template>

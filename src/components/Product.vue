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
	<NuxtLink
		class="bg-white border flex flex-col overflow-hidden rounded-3xl"
		:to="`/${category}/${slug}`"
	>
		<nuxt-img
			sizes="sm:100vw md:354px lg:312px xl:398px 2xl:356px"
			:src="image"
			:alt="`${parentName} - ${name}`"
		/>
		<Stack class="p-6" gap="4" items="center" justify="between">
			<Stack class="overflow-hidden" vertical>
				<span
					class="font-medium overflow-hidden whitespace-nowrap"
					style="text-overflow: ellipsis"
				>
					{{ name }}
				</span>
				<span v-if="parentName" class="text-gray-600 text-sm">
					{{ parentName }}
				</span>
			</Stack>
			<span
				class="bg-gray-100 font-medium rounded-full px-3 py-1.5 text-sm"
			>
				AR${{ price }}
			</span>
		</Stack>
	</NuxtLink>
</template>

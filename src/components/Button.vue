<script setup lang="ts">
const props = defineProps<{
	pending?: boolean
	block?: boolean
	icon?: string
}>()

const buildClasses = () => {
	const classes: string[] = []

	if (props.block) {
		classes.push('w-full')
	} else {
		classes.push('w-min')
	}

	return classes.join(' ')
}
</script>

<template>
	<button
		:class="buildClasses"
		class="py-3 px-5 bg-gray-900 hover:bg-gray-800 duration-100 flex font-medium items-center justify-between px-5 py-4 rounded-2xl shadow-md space-x-4 text-white whitespace-nowrap"
	>
		<Icon
			v-if="pending"
			class="animate-spin mx-auto"
			name="tabler:loader-2"
		/>
		<template v-else>
			<span>
				<slot />
			</span>
			<Icon v-if="icon" :name="icon" />
		</template>
	</button>
</template>

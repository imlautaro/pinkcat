<script setup lang="ts">
useHead({
	meta: [
		{
			name: 'theme-color',
			content: '#212121',
		},
	],
})
</script>

<template>
	<v-app class="bg-grey-lighten-5">
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</v-app>
</template>

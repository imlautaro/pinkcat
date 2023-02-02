<script setup lang="ts">
useHead({
	htmlAttrs: {
		lang: 'es-AR',
	},
	meta: [
		{
			name: 'theme-color',
			content: '#ffffff',
		},
	],
})

useSchemaOrg([
	defineOrganization({
		name: 'PINKCAT',
		logo: '/logo.png',
		sameAs: [
			'https://www.instagram.com/pinkcatok/',
			'https://www.facebook.com/PinkCatTienda',
		],
	}),
	defineWebSite({
		name: 'PINKCAT',
	}),
	defineWebPage(),
])
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

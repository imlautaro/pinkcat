<script setup lang="ts">
useHead({
	htmlAttrs: {
		lang: 'es-AR',
	},
	meta: [
		{
			name: 'theme-color',
			content: '#212121',
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
	<v-app class="bg-grey-lighten-5">
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</v-app>
</template>

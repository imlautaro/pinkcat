<template>
	<nav class="bg-white border-b py-4">
		<Container class="flex items-center justify-between">
			<!-- <div class="h-6 w-6"></div> -->
			<button class="flex md:hidden p-2 invisible">
				<Icon name="heroicons:bars-3-solid" />
			</button>
			<NuxtLink class="flex items-center p-2 rounded-lg space-x-2" to="/">
				<BrandIsotype class="h-10" />

				<span v-if="true" class="font-black text-2xl">PINKCAT</span>
				<BrandLogotype v-else class="h-8 text-gray-900" />
			</NuxtLink>
			<Stack gap="4" items="center">
				<NuxtLink
					class="flex p-2"
					target="_blank"
					rel="nofollow noopener noreferrer"
					aria-label="Cuenta de Instagram de PINKCAT"
					to="https://www.instagram.com/pinkcatok"
				>
					<Icon name="fa-brands:instagram" />
				</NuxtLink>
			</Stack>
		</Container>
	</nav>
</template>

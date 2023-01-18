<template>
	<div class="flex flex-col sticky top-0 z-10">
		<div class="bg-yellow-400 p-4 md:text-center text-sm font-medium">
			Este sitio está siendo desarrollado, pero puedes explorar entre
			algunos productos y ver sus precios.
		</div>
		<div class="bg-gray-900 text-primary px-4 py-4">
			<div class="grid grid-cols-3">
				<div
					class="col-span-1 col-start-2 flex items-center justify-center"
				>
					<NuxtLink to="/">
						<BrandLogotype class="h-8 md:h-10" />
					</NuxtLink>
				</div>
				<div
					class="col-span-1 col-start-3 flex items-center justify-end"
				>
					<NuxtLink
						to="https://instagram.com/pinkcatok"
						target="_blank"
					>
						<Icon name="ion:logo-instagram" />
					</NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>

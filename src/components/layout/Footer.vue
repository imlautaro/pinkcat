<template>
	<footer class="bg-white border-t py-8 text-sm text-gray-600">
		<Container
			class="flex lt-md:(flex-col space-y-4) items-center justify-between"
		>
			<span>PINKCAT &copy; {{ new Date().getFullYear() }} </span>
			<Stack gap="1" items="center">
				<Icon name="heroicons:map-pin" />
				<span class="select-text">San Miguel, Buenos Aires</span>
			</Stack>
		</Container>
	</footer>
</template>

<template>
	<footer class="bg-gray-900 py-6 text-sm text-gray-400">
		<Container
			class="flex lt-sm:(flex-col space-y-4) items-center justify-between"
		>
			<span>PINKCAT &copy; {{ new Date().getFullYear() }}</span>
			<Stack gap="2">
				<Icon name="ion:md-pin" />
				<span>San Miguel, Buenos Aires</span>
			</Stack>
		</Container>
	</footer>
</template>

<script setup lang="ts">
const user = useSupabaseUser()
const supaAuth = useSupabaseAuthClient().auth

const logout = async () => {
	await supaAuth.signOut()
	return navigateTo('/')
}
</script>

<template>
	<div>
		<Stack class="sticky top-0" vertical>
			<div v-if="false" class="bg-yellow-400 py-4 text-sm">
				<Container class="text-center">
					Este sitio está siendo desarrollado, pero puedes explorar
					entre algunos productos, ver sus precios y realizar pedidos
					sin problemas.
				</Container>
			</div>
			<LayoutNavigation />
		</Stack>

		<slot />

		<LayoutFooter />
	</div>
</template>

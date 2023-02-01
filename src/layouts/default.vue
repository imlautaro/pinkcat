<script setup lang="ts">
const user = useSupabaseUser()
const supaAuth = useSupabaseAuthClient().auth

const logout = async () => {
	await supaAuth.signOut()
	return navigateTo('/')
}

const drawer = ref(false)
</script>

<template>
	<div>
		<!-- <v-navigation-drawer v-model="drawer"> </v-navigation-drawer> -->
		<v-app-bar color="grey-darken-4">
			<v-toolbar-title>
				<NuxtLink class="text-white text-decoration-none" to="/">
					PINKCAT
				</NuxtLink>
			</v-toolbar-title>

			<v-spacer />
			<v-btn
				icon="mdi-instagram"
				href="https://instagram.com/pinkcatok"
				target="_blank"
				rel="nofollow noopener noreferrer"
			/>
			<template v-if="user">
				<v-btn @click="logout">Cerrar sesión</v-btn>
			</template>
		</v-app-bar>
		<v-main>
			<slot />
		</v-main>
		<v-footer class="bg-grey-darken-4">
			<v-container>
				<v-row>
					<v-col
						cols="12"
						sm="6"
						class="d-flex justify-center justify-sm-start"
					>
						PINKCAT &copy; {{ new Date().getFullYear() }}
					</v-col>
					<v-col
						cols="12"
						sm="6"
						class="d-flex justify-center justify-sm-end"
					>
						<v-icon class="mr-2">mdi-map-marker</v-icon> San Miguel,
						Buenos Aires
					</v-col>
				</v-row>
			</v-container>
		</v-footer>
	</div>
</template>

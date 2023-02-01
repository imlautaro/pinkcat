<script setup lang="ts">
definePageMeta({
	layout: 'auth',
	middleware: 'unauthenticated',
})

const { pending, credentials, login } = useAuth()
</script>

<template>
	<div>
		<v-container class="py-16">
			<v-row>
				<v-col class="mx-auto" cols="4">
					<v-form @submit.prevent="login">
						<v-text-field
							v-model="credentials.email"
							label="Correo electrónico"
							type="email"
							variant="outlined"
						/>
						<v-text-field
							v-model="credentials.password"
							label="Contraseña"
							type="password"
							variant="outlined"
						/>
						<v-btn
							color="pink-lighten-4"
							variant="flat"
							block
							type="submit"
							:loading="pending"
							size="large"
						>
							Ingresar
						</v-btn>
					</v-form>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

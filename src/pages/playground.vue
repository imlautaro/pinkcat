<script setup lang="ts">
const pending = ref(false)

const testPending = () => {
	pending.value = true

	setTimeout(() => {
		pending.value = false
	}, 3000)
}
</script>

<template>
	<div>
		<div class="flex flex-col space-y-6 p-12">
			<h1>Playground</h1>
			<Button @click="testPending" :pending="pending" block>Pagar</Button>
		</div>
	</div>
</template>

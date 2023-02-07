<script setup lang="ts">
import { v4 as uuid } from 'uuid'

withDefaults(
	defineProps<{
		icon?: string
		modelValue: string
		label?: string
		placeholder?: string
		type?: string
		valid?: boolean | null
	}>(),
	{ valid: null }
)

defineEmits(['update:modelValue'])

const id = uuid()

const show = ref(false)
</script>

<template>
	<Stack gap="2" vertical>
		<label v-if="label" class="text-sm" :for="id">{{ label }}</label>
		<div class="relative">
			<Icon
				v-if="icon"
				class="absolute left-4 top-1/2 text-sm -translate-y-1/2 text-gray-600"
				:name="icon"
			/>
			<input
				class="bg-gray-100 pl-12 px-5 py-4 w-full rounded-2xl"
				:id="id"
				:value="modelValue"
				@input="
					$emit(
						'update:modelValue',
						($event.target as HTMLInputElement).value
					)
				"
				:type="
					type === 'password' ? (show ? 'text' : 'password') : type
				"
				:placeholder="placeholder ? placeholder : label"
			/>
			<Icon
				v-if="valid === true"
				class="text-green-600 absolute right-4 top-1/2 -translate-y-1/2"
				name="heroicons:check-circle"
			/>
			<Icon
				v-else-if="valid === false"
				class="text-red-600 absolute right-4 top-1/2 -translate-y-1/2"
				name="heroicons:exclamation-circle"
			/>
		</div>
	</Stack>
</template>

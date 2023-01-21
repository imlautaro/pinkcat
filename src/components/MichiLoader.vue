<script setup lang="ts">
defineProps<{ show?: boolean; circularLoader?: boolean }>()
</script>

<template>
	<Transition
		enter-active-class="duration-500"
		leave-active-class="duration-500"
		enter-from-class="opacity-0"
		leave-to-class="opacity-0 delay-1000"
	>
		<div v-if="show">
			<div
				class="fixed top-0 left-0 w-screen h-screen bg-white z-50"
			></div>
			<div
				v-if="circularLoader"
				class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
			>
				<div
					class="w-32 h-32 rounded-full border-b-primary-300 border-2 border-transparent animate-spin animate-duration-1250"
				/>
			</div>
			<span
				class="fixed bottom-12 left-1/2 -translate-x-1/2 text-xs text-gray-500 select-none uppercase font-bold tracking-wider z-50"
			>
				Por favor, espere...
			</span>
			<div
				class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-primary-500"
			>
				<svg
					width="64"
					height="64"
					viewBox="0 0 32 32"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g clip-path="url(#clip0_49_3)">
						<path
							d="M16 14C11.0369 14 4 21.6725 4 26.5156C4 28.6969 5.67563 30 8.48375 30C11.5363 30 13.5519 28.4325 16 28.4325C18.4694 28.4325 20.4906 30 23.5163 30C26.3244 30 28 28.6969 28 26.5156C28 21.6725 20.9631 14 16 14Z"
							fill="currentColor"
							class="animate-pulse animate-delay-1250 animate-duration-1250"
						/>
						<path
							d="M2.3225 10.0787C4.1425 9.64375 6.145 11.0462 6.795 13.2119C7.445 15.3775 6.49688 17.4856 4.67688 17.9206C2.85688 18.3556 0.854376 16.9531 0.204376 14.7875C-0.445624 12.6219 0.502501 10.5137 2.3225 10.0787Z"
							fill="currentColor"
							class="animate-pulse animate-delay-250 animate-duration-1250"
						/>
						<path
							d="M25.2044 13.2125C25.855 11.0469 27.8569 9.64438 29.6769 10.0794C31.4969 10.5144 32.445 12.6225 31.795 14.7881C31.1444 16.9538 29.1425 18.3562 27.3225 17.9212C25.5025 17.4862 24.5544 15.3781 25.2044 13.2125Z"
							fill="currentColor"
							class="animate-pulse animate-delay-1000 animate-duration-1250"
						/>
						<path
							d="M24.7513 7.92125C24.0113 10.635 21.8438 12.4219 19.91 11.9131C17.9763 11.4044 17.0088 8.79187 17.7488 6.07812C18.4888 3.36438 20.6563 1.57688 22.59 2.08625C24.5238 2.59562 25.4913 5.2075 24.7513 7.92125Z"
							fill="currentColor"
							class="animate-pulse animate-delay-750 animate-duration-1250"
						/>
						<path
							d="M14.2513 6.07812C14.9913 8.79187 14.0238 11.4044 12.09 11.9131C10.1569 12.4225 7.98875 10.635 7.24875 7.92125C6.50875 5.2075 7.47625 2.595 9.41 2.08625C11.3438 1.5775 13.5113 3.36438 14.2513 6.07812Z"
							fill="currentColor"
							class="animate-pulse animate-delay-500 animate-duration-1250"
						/>
					</g>
					<defs>
						<clipPath id="clip0_49_3">
							<rect width="32" height="32" fill="white" />
						</clipPath>
					</defs>
				</svg>
			</div>
		</div>
	</Transition>
</template>

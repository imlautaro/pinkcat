<script setup lang="ts">
const sizes = [
	{
		Talle: 'S',
		Sisa: '48cm',
		Largo: '69cm',
	},
	{
		Talle: 'M',
		Sisa: '51cm',
		Largo: '71cm',
	},
	{
		Talle: 'L',
		Sisa: '54cm',
		Largo: '74cm',
	},
	{
		Talle: 'XL',
		Sisa: '56cm',
		Largo: '76cm',
	},
	{
		Talle: 'XXL',
		Sisa: '58cm',
		Largo: '78cm',
	},
	{
		Talle: 'XXXL',
		Sisa: '60cm',
		Largo: '80cm',
	},
]
</script>

<template>
	<div class="bg-gray-100 rounded-2xl">
		<table class="text-sm w-full">
			<thead>
				<tr>
					<th
						v-for="key in Object.keys(sizes[0])"
						class="p-4"
						:class="{
							'text-red-600': key === 'Sisa',
							'text-blue-600': key === 'Largo',
						}"
					>
						{{ key }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="size in sizes">
					<td
						v-for="key in Object.keys(size)"
						class="p-4 text-center"
					>
						{{ size[key as keyof typeof size] }}
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script lang="ts">
	import ProductCard from '$lib/app/navbar/product-card.svelte';
	import type { PageData } from './$types';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { ChevronDown } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import Input from '$lib/components/ui/input/input.svelte';

	export let data: PageData;
	const { categories, products, cartItems } = data;

	let searchTerm = '';
	let selectedCategory: string | null = null;
	let priceMin: number | null = null;
	let priceMax: number | null = null;

	$: filteredProducts = products.filter(({ title, category, price }) => {
		const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory = selectedCategory ? category === selectedCategory : true;
		const priceNumber = Number(price);
		const matchesMin = priceMin !== null ? priceNumber >= priceMin : true;
		const matchesMax = priceMax !== null ? priceNumber <= priceMax : true;
		return matchesSearch && matchesCategory && matchesMin && matchesMax;
	});

	$: filteredProductsWithoutCategory = filteredProducts.map(({ category, ...rest }) => rest);

	function selectCategory(catName: string | null) {
		selectedCategory = selectedCategory === catName ? null : catName;
	}

	function onMinInput(event: Event) {
		const value = (event.target as HTMLInputElement).value;
		priceMin = value === '' ? null : Number(value);
	}

	function onMaxInput(event: Event) {
		const value = (event.target as HTMLInputElement).value;
		priceMax = value === '' ? null : Number(value);
	}
</script>

<div class="mt-12 space-y-10 px-2 pb-20 sm:px-4 md:px-8 lg:px-16">
	<div class="flex flex-col gap-10 px-4 lg:flex-row lg:px-0">
		<aside class="w-full space-y-6 lg:w-1/5">
			<div class="flex justify-center">
				<Input
					type="text"
					bind:value={searchTerm}
					placeholder="Search products..."
					class="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none"
				/>
			</div>

			<div class="w-full space-y-4 rounded-xl border bg-white p-4 shadow">
				<h2 class="text-lg font-semibold">Mini Cart</h2>
				{#if cartItems.length > 0}
					<ul class="space-y-2">
						{#each cartItems as item}
							<li class="flex items-center justify-between border-b pb-1 text-sm">
								<div class="flex items-center gap-2">
									<img src={item.imageSrc} alt={item.productName} class="h-8 w-8 rounded object-cover" />
									<span>{item.productName}</span>
								</div>
								<span class="text-green-600">₱{(+item.price).toFixed(2)}</span>
							</li>
						{/each}
					</ul>
					<div class="text-right font-semibold">
						Total: ₱
						{cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0).toFixed(2)}
					</div>
					<Button class="w-full rounded-md bg-blue-600 px-3 py-1 text-white hover:bg-blue-400" href="/cart">
						Checkout
					</Button>
				{:else}
					<p class="text-sm text-gray-500">Your cart is empty.</p>
				{/if}
			</div>
			<h3 class="text-lg font-bold">Filters</h3>

			<div>
				<label for="price-min" class="mb-1 block text-sm font-medium text-gray-700"
					>Price Range</label
				>
				<div class="flex gap-2">
					<Input
						id="price-min"
						type="number"
						min="0"
						placeholder="Min"
						oninput={onMinInput}
						class="w-full rounded-md border p-2 text-sm"
					/>
					<Input
						id="price-max"
						type="number"
						min="0"
						placeholder="Max"
						oninput={onMaxInput}
						class="w-full rounded-md border p-2 text-sm"
					/>
				</div>
			</div>
			<div>
				<label for="shipped-from" class="mb-1 block text-sm font-medium text-gray-700"
					>Shipped From</label
				>

				<DropdownMenu.Root>
					<DropdownMenu.Trigger
						class={buttonVariants({
							variant: 'outline',
							class: 'w-full justify-between text-start'
						})}>All <ChevronDown /></DropdownMenu.Trigger
					>
					<DropdownMenu.Content class="flex lg:w-[350px]">
						<DropdownMenu.Group class="w-full">
							<DropdownMenu.Item>All</DropdownMenu.Item>
							<DropdownMenu.Item>Balanga</DropdownMenu.Item>
							<DropdownMenu.Item>Pilar</DropdownMenu.Item>
							<DropdownMenu.Item>Limay</DropdownMenu.Item>
							<DropdownMenu.Item>Mariveles</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>

				<div>
					<label for="rating" class="mb-1 block text-sm font-medium text-gray-700"
						>Minimum Rating</label
					>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger
							class={buttonVariants({
								variant: 'outline',
								class: 'w-full justify-between text-start'
							})}>All <ChevronDown /></DropdownMenu.Trigger
						>
						<DropdownMenu.Content class="flex lg:w-[350px]">
							<DropdownMenu.Group class="w-full">
								<DropdownMenu.Item>⭐1 and up</DropdownMenu.Item>
								<DropdownMenu.Item>⭐2 and up</DropdownMenu.Item>
								<DropdownMenu.Item>⭐3 and up</DropdownMenu.Item>
								<DropdownMenu.Item>⭐4 and up</DropdownMenu.Item>
								<DropdownMenu.Item>⭐5 and up</DropdownMenu.Item>
							</DropdownMenu.Group>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</div>
			</div>
		</aside>
		<div class="flex-1 space-y-4">
			<h2 class="mb-4 text-xl font-bold">Categories</h2>
			<div class="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
				<Button
					type="button"
					onclick={() => selectCategory(null)}
					class="rounded-md border px-4 py-2 text-center text-sm font-medium
						focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1
						{selectedCategory === null
						? 'bg-blue-600 hover:bg-blue-400'
						: 'hover:bg-gray-30 bg-gray-200 text-gray-800'}"
				>
					All
				</Button>
				{#each categories as category}
					<Button
						type="button"
						onclick={() => selectCategory(category.category_name)}
						class="rounded-md px-3 py-1 text-white transition-colors
							{selectedCategory === category.category_name
							? 'bg-blue-600 hover:bg-blue-400'
							: 'bg-gray-200 text-gray-800 hover:bg-gray-300'}"
					>
						{category.category_name}
					</Button>
				{/each}
			</div>
			<h2 class="mb-4 pt-12 text-xl font-bold">Products</h2>
			<div class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 xl:grid-cols-4">
				{#each filteredProductsWithoutCategory as product}
					<a href="/kmart/{product.id}/product-preview"><ProductCard {product} /></a>
				{/each}
			</div>
		</div>
	</div>
</div>

<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { X } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	export let data;
	$: cartItems = data.cartItems;
	$: total = cartItems
		.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)
		.toFixed(2);
	function updateLocalQuantity(cartId: string, newQuantity: number) {
		cartItems = cartItems.map(item => 
			item.cartId === cartId ? { ...item, quantity: newQuantity } : item
		);
	}
	async function updateQuantity(cartId: string, newQuantity: number) {
		if (newQuantity < 1) return;
		const originalItems = [...cartItems];
		updateLocalQuantity(cartId, newQuantity);
		try {
			const formData = new FormData();
			formData.append('cartId', cartId);
			formData.append('quantity', newQuantity.toString());

			const res = await fetch('?/updateQuantity', {
				method: 'POST',
				body: formData
			});
			if (res.ok) {
				await invalidateAll();
			} else {
				cartItems = originalItems;
				console.error('Failed to update quantity');
			}
		} catch (error) {
			cartItems = originalItems;
			console.error('Error updating quantity:', error);
		}
	}
</script>

<section class="bg-gray-50 py-12">
	<div class="mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow-xl">
		<h2 class="mb-8 text-3xl font-bold tracking-tight text-gray-800">Shopping Cart</h2>

		{#if cartItems.length === 0}
			<p class="text-center text-gray-500 text-lg">Your cart is empty.</p>
		{:else}
			<div class="space-y-6">
				{#each cartItems as item (item.cartId)}
					<div class="flex flex-col items-start justify-between gap-4 border-b pb-6 sm:flex-row sm:items-center">
						<div class="flex items-center gap-4">
							<img
								src={item.image ?? '/placeholder.jpg'}
								alt={item.name ?? 'Unnamed Product'}
								class="h-20 w-20 rounded-lg object-cover border"
							/>
							<div>
								<h4 class="text-lg font-medium text-gray-800">{item.name ?? 'Unnamed Product'}</h4>
								<p class="text-sm text-gray-500">₱{Number(item.price).toFixed(2)}</p>
							</div>
						</div>

						<div class="flex flex-col items-end gap-2 sm:items-center sm:flex-row sm:gap-4">
							<div class="flex items-center space-x-2">
								<Button
									class="rounded-md bg-gray-200 text-black px-2 py-1 text-sm hover:bg-gray-300"
									onclick={() => updateQuantity(item.cartId, item.quantity - 1)}
									aria-label="Decrease quantity"
								>
									-
								</Button>
								<Input
									type="number"
									class="w-16 rounded-md border px-2 py-1 text-center text-gray-800"
									value={item.quantity}
									min="1"
									readonly
								/>
								<Button
									class="rounded-md bg-gray-200 text-black px-2 py-1 text-sm hover:bg-gray-300"
									onclick={() => updateQuantity(item.cartId, item.quantity + 1)}
									aria-label="Increase quantity"
								>
									+
								</Button>
							</div>
							<form 
								method="POST" 
								action="?/deleteItem"
								use:enhance={() => {
									return async ({ result }) => {
										if (result.type === 'success') {
											await invalidateAll();
										}
									};
								}}
							>
								<input type="hidden" name="cartId" value={item.cartId} />
								<Button
									class="rounded-md bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
									type="submit"
								>
									<X />
								</Button>
							</form>
						</div>
					</div>
				{/each}
			</div>

			<div class="mt-10 flex flex-col items-end gap-4 sm:flex-row sm:justify-between sm:items-center">
				<h3 class="text-xl font-bold text-gray-800">Total: ₱{total}</h3>

				<div class="flex flex-col gap-3 sm:flex-row sm:gap-4">
					<Button
						class="rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
						href="/ordersuccessful"
					>
						Checkout
					</Button>

					<form 
						method="POST" 
						action="?/clearCart"
						use:enhance={() => {
							return async ({ result }) => {
								if (result.type === 'success') {
									await invalidateAll();
								}
							};
						}}
					>
						<Button
							class="rounded-md bg-red-600 px-6 py-3 text-white hover:bg-red-700"
							type="submit"
						>
							Clear Cart
						</Button>
					</form>
				</div>
			</div>
		{/if}
	</div>
</section>
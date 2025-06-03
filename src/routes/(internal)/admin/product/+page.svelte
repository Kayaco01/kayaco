<script lang="ts">
	import * as Select from "$lib/components/ui/select/index.js";
	import * as Dialog from '$lib/components/ui/dialog/index.js';
  import { invalidate } from '$app/navigation';
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import { productSchema } from '$lib/zod-schema';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient, zod } from 'sveltekit-superforms/adapters';
	import { Label } from '$lib/components/ui/label';
	import { LoaderCircle, Search, Filter, Eye, Edit, Trash2, Package } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import { defaults } from 'sveltekit-superforms';
	import { Button } from '$lib/components/ui/button';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { page } from '$app/stores';
	import DataTable from '$lib/app/table/data-table.svelte';
	import { product } from '$lib/app/product/columns';
  
	const form = superForm(defaults(zod(productSchema)), {
		validators: zodClient(productSchema),
		resetForm: false,
		async onResult({ result }) {
			if (result.type === 'failure') {
				toast.error('Failed to create product.');
			} else if (result.type === 'success') {
				toast.success('Product created successfully!');
				open = false;
        await invalidate('/(internal)/admin/product');
			}
		}
	});

	const { form: formData, enhance, submitting, submit } = form;

	let open = $state(false);

	let { data } = $props();

	let { products } = data;
 

</script>

<div class="space-y-6">
	<!-- Header Section -->
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-3">
			<div class="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
				<Package class="w-6 h-6 text-blue-400" />
			</div>
			<div class = ""> 
				<h1 class="text-2xl font-bold text-black">Product Management</h1>
				<p class="text-black">Manage your inventory and product catalog</p>
			</div>
		</div>
  </div>



<Dialog.Root bind:open>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Add Product</Dialog.Trigger>

	<Dialog.Content class="space-y-4">
		<Dialog.Header>
			<Dialog.Title>Add Product</Dialog.Title>
			<Dialog.Description>Enter the product info below</Dialog.Description>
		</Dialog.Header>

		<form
			method="POST"
			action="?/product"
			use:enhance
			class="w-full gap-y-12 space-y-6"
			enctype="multipart/form-data"
		>
			<div class="space-y-4">
				<Form.Field {form} name="categoryId">
					<Form.Control>
					  {#snippet children({ props })}
						<Label for="categoryId">Category</Label>
						<Select.Root
							type="single"
							name="categoryId"
							bind:value={$formData.categoryId}
							>
							<Select.Trigger class="w-full border border-gray-300 p-2 rounded">
								{#if $formData.categoryId}
								{#each $page.data.categories as cat (cat.id)}
									{#if cat.id === $formData.categoryId}
									{cat.category_name}
									{/if}
								{/each}
								{:else}
								Select a category
								{/if}
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
								<Label>Categories</Label>
								{#each $page.data.categories as cat (cat.id)}
									<Select.Item
									value={cat.id}
									label={cat.category_name}
									>
									{cat.category_name}
									</Select.Item>
								{/each}
								</Select.Group>
							</Select.Content>
							</Select.Root>
					  {/snippet}
					</Form.Control>
					<Form.FieldErrors />
				  </Form.Field>				  

				<Form.Field {form} name="product_name">
					<Form.Control>
						{#snippet children({ props })}
							<Label>Product Name</Label>
							<Input
								placeholder="Enter Product Name"
								type="text"
								{...props}
								bind:value={$formData.product_name}
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="description">
					<Form.Control>
						{#snippet children({ props })}
							<Label>Product Description</Label>
							<Input
								placeholder="Enter Product Description"
								type="text"
								{...props}
								bind:value={$formData.description}
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="price">
					<Form.Control>
						{#snippet children({ props })}
							<Label>Product Price</Label>
							<Input
								placeholder="Enter Product Price"
								type="number"
								{...props}
								bind:value={$formData.price}
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="quantity">
					<Form.Control>
						{#snippet children({ props })}
							<Label>Product Quantity</Label>
							<Input
								placeholder="Enter Product Quantity"
								type="number"
								{...props}
								bind:value={$formData.quantity}
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<div>
					<Label for="image_url">Product Image</Label>
					<input
						type="file"
						name="image_url"
						id="image_url"
						required
						class="w-full border border-gray-300 p-2 rounded"
					/>
				</div>
			</div>

			<Dialog.Footer class="mt-8 gap-4 md:gap-0">
				<Button variant="outline" disabled={$submitting} onclick={() => (open = false)}>
					Cancel
				</Button>
				<Form.Button class=" bg-primary" disabled={$submitting} onclick={() => submit()}>
					{#if $submitting}
						<LoaderCircle class="mr-1 size-4 animate-spin" /> Creating Product...
					{:else}
						Create Product
					{/if}
				</Form.Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>

<div>
		<DataTable filterKey="product_name" columns={product} data={products} />
</div>

</div>

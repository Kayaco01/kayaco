<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { categorySchema } from '$lib/zod-schema';
	import { toast } from 'svelte-sonner';
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod, zodClient } from 'sveltekit-superforms/adapters';
	import DataTable from '$lib/app/table/data-table.svelte';
	import { category } from '$lib/app/category/columns';

	const form = superForm(defaults(zod(categorySchema)), {
		validators: zodClient(categorySchema),
		resetForm: false,
		onResult({ result }) {
			if (result.type === 'failure') {
				toast.error('Category cannot be added.');
				console.log(result);
			} else if (result.type === 'success') {
				open = false;
				toast.success('Category added successfully!');
			}
		}
	});

	const { form: formData, enhance } = form;

	let open = $state(false);

	let { data } = $props();

	let { categoryDetails } = data;
</script>

<div class="w-full space-y-4 px-12">
	<Dialog.Root bind:open>
		<Dialog.Trigger>
			<Button>Add Category</Button>
		</Dialog.Trigger>

		<Dialog.Content class="space-y-4">
			<Dialog.Header>
				<Dialog.Title>Add Category</Dialog.Title>
				<Dialog.Description>Enter the category name below.</Dialog.Description>
			</Dialog.Header>
			<form method="POST" use:enhance action="category">
				<Form.Field {form} name="category">
					<Form.Control>
						{#snippet children({ props })}
							<Input {...props} bind:value={$formData.category} placeholder="First Name" />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Button class="w-full bg-blue-500 hover:bg-blue-400">Add</Form.Button>
			</form>
		</Dialog.Content>
	</Dialog.Root>

	<div>
		<DataTable filterKey="category_name" columns={category} data={categoryDetails} />
	</div>
</div>

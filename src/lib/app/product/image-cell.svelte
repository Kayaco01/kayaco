<script lang="ts">
	let { imageUrl, productName } = $props<{
		imageUrl: string;
		productName: string;
	}>();

	let imageError = $state(false);
	let imageLoading = $state(true);

	function handleImageLoad() {
		imageLoading = false;
	}

	function handleImageError() {
		imageError = true;
		imageLoading = false;
	}
</script>

<div class="flex items-center justify-center w-12 h-12">
	{#if imageError}
		<div class="w-12 h-12 bg-gray-100 rounded-md border flex items-center justify-center">
			<svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
			</svg>
		</div>
	{:else}
		{#if imageLoading}
			<div class="w-12 h-12 bg-gray-100 rounded-md border animate-pulse"></div>
		{/if}
		<img
			src={imageUrl}
			alt={productName}
			class="w-12 h-12 object-cover rounded-md border shadow-sm {imageLoading ? 'hidden' : ''}"
			loading="lazy"
			onload={handleImageLoad}
			onerror={handleImageError}
		/>
	{/if}
</div>
<script lang="ts">
	import Navbar from '$lib/app/navbar/navbar.svelte';
	import Footer from '$lib/app/navbar/footer.svelte';

	let { children } = $props();
</script>

<Navbar />
{@render children()}
<Footer />
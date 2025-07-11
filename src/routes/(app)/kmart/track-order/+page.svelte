<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ChevronLeft, Download } from '@lucide/svelte';
	import OrderTracking from '$lib/app/navbar/track-order.svelte';

	interface TrackingStep {
		active: boolean;
		icon: 'cart' | 'package' | 'truck' | 'location' | 'home';
		label: string;
		date: string;
	}
	
	const orderData = {
		orderNumber: '54879861231',
		orderPlaced: 'May 20th, 2025',
		orderDelivered: 'Not yet delivered',
		noOfItems: '1 Item(s)',
		status: 'Out for delivery',
		trackingId: '#1223'
	};
	
	const trackingSteps: TrackingStep[] = [
		{ icon: 'cart', label: 'Order Placed', date: 'May 20th, 2025', active: true },
		{ icon: 'package', label: 'Order Packed', date: 'May 21st, 2025', active: true },
		{ icon: 'truck', label: 'In Transit', date: 'May 22nd, 2021', active: true },
		{ icon: 'location', label: 'Out for delivery', date: 'May 24th, 2025', active: true },
		{ icon: 'home', label: 'Delivered', date: 'May 25th, 2025 (expected date)', active: false }
	];
	
	const orderItems = [
		{
			name: 'AK47',
			category: 'Gun',
			variant: 'Blue',
			delivery: '25th May, 2025',
			quantity: 1,
			price: 2400,
			image: '/img/k-mart.jpg'
		}
	];
	
	const orderInfoFields = [
		{ label: 'Order Number', value: orderData.orderNumber },
		{ label: 'Order Placed', value: orderData.orderPlaced },
		{ label: 'Order Delivered', value: orderData.orderDelivered },
		{ label: 'No of Items', value: orderData.noOfItems },
		{ label: 'Status', value: orderData.status }
	];
</script>

<div class="max-w-6xl mx-auto bg-white p-8">
	<!-- Header -->
	<div class="flex items-center justify-between mb-8">
		<div class="flex items-center gap-3">
			<button class="p-2 hover:bg-gray-100 rounded-lg">
				<ChevronLeft class="w-5 h-5 text-gray-600" />
			</button>
			<h1 class="text-xl font-semibold text-gray-900">Order Details</h1>
		</div>
		<Button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
			<Download class="w-4 h-4 mr-2" />Download Invoice
		</Button>
	</div>
	
	<!-- Order Info Grid -->
	<div class="grid grid-cols-5 gap-6 mb-8">
		{#each orderInfoFields as field}
			<div class="text-center">
				<p class="text-sm text-gray-500 mb-1">{field.label}</p>
				<p class="font-medium text-gray-900">{field.value}</p>
			</div>
		{/each}
	</div>
	
	<!-- Order Tracking Component -->
	<div class="mb-8">
		<OrderTracking 
			{trackingSteps} 
			trackingId={orderData.trackingId}
			currentStatus={orderData.status}
		/>
	</div>
	
	<!-- Items from the order -->
	<div>
		<h2 class="text-lg font-semibold text-gray-900 mb-6">Item(s) from the order</h2>
		
		<!-- Table Header -->
		<div class="grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 mb-4">
			<div class="col-span-6">
				<p class="text-sm font-medium text-gray-500">Product</p>
			</div>
			<div class="col-span-3 text-center">
				<p class="text-sm font-medium text-gray-500">Quantity</p>
			</div>
			<div class="col-span-3 text-right">
				<p class="text-sm font-medium text-gray-500">Total Price</p>
			</div>
		</div>
		
		<!-- Product Items -->
		{#each orderItems as item}
			<div class="grid grid-cols-12 gap-4 py-4">
				<div class="col-span-6 flex items-start gap-4">
					<img src="{item.image}" alt="{item.name}" class="w-24 h-24 rounded-lg object-cover" />
					<div>
						<h3 class="font-semibold text-gray-900 mb-1">{item.name}</h3>
						<p class="text-sm text-gray-600 mb-1">{item.category}</p>
						<p class="text-sm text-gray-600 mb-1">Variant: <span class="font-medium">{item.variant}</span></p>
						<p class="text-sm text-gray-600">Delivery: <span class="font-medium">{item.delivery}</span></p>
					</div>
				</div>
				
				<div class="col-span-3 flex justify-center items-start pt-2">
					<span class="text-lg font-medium">{item.quantity}</span>
				</div>
				
				<div class="col-span-3 text-right pt-2">
					<p class="text-lg font-semibold text-gray-900">₱ {item.price.toLocaleString()}</p>
					<p class="text-xs text-gray-500">Cash on Delivery</p>
				</div>
			</div>
		{/each}
	</div>
</div>
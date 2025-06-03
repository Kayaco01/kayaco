<script lang="ts">
	import { ShoppingCart, Package2, Truck, MapPin, Home } from '@lucide/svelte';

	interface TrackingStep {
		active: boolean;
		icon: 'cart' | 'package' | 'truck' | 'location' | 'home';
		label: string;
		date: string;
	}
	
	export let trackingSteps: TrackingStep[] = [];
	export let trackingId: string = '';
	export let currentStatus: string = '';
	
	const iconMap = {
		cart: ShoppingCart,
		package: Package2,
		truck: Truck,
		location: MapPin,
		home: Home
	} as const;
	
	$: activeSteps = trackingSteps.filter(step => step.active).length;
	$: totalSteps = trackingSteps.length;
	$: progressPercentage = totalSteps > 1 ? ((activeSteps - 1) / (totalSteps - 1)) * 100 : 0;
</script>

<div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 shadow-sm">
	<!-- Header -->
	<div class="flex items-center justify-between mb-8">
		<div>
			<h2 class="text-2xl font-bold text-gray-900 mb-2">Track Your Order</h2>
			<span class="text-sm text-blue-600 font-medium bg-blue-100 px-3 py-1 rounded-full">
				Tracking ID {trackingId}
			</span>
		</div>
		<div class="text-right">
			<p class="text-sm text-gray-500 mb-1">Current Status</p>
			<p class="text-lg font-semibold text-blue-600">{currentStatus}</p>
		</div>
	</div>
	
	<!-- Progress Steps -->
	<div class="flex items-start justify-between relative">
		{#each trackingSteps as step, i}
			<div class="flex flex-col items-center relative z-10 flex-1">
				<div class="relative">
					{#if step.active}
						<div class="absolute inset-0 w-20 h-20 rounded-full bg-blue-400 opacity-20 animate-pulse"></div>
					{/if}
					
					<div class="relative w-20 h-20 rounded-full flex items-center justify-center border-3 transition-all duration-300 {
						step.active 
							? 'bg-gradient-to-br from-blue-500 to-blue-600 border-blue-500 shadow-lg transform scale-110' 
							: 'bg-white border-gray-300 shadow-sm'
					}">
						{#if step.active && i < activeSteps - 1}
							<div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
								<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
								</svg>
							</div>
						{:else}
							<svelte:component 
								this={iconMap[step.icon]} 
								class="w-{step.active ? '10' : '8'} h-{step.active ? '10' : '8'} {step.active ? 'text-white' : 'text-gray-400'}" 
							/>
						{/if}
					</div>
				</div>
				
				<!-- Labels -->
				<div class="text-center mt-4 max-w-32">
					<p class="text-sm font-semibold mb-1 {step.active ? 'text-gray-900' : 'text-gray-400'}">{step.label}</p>
					<p class="text-xs px-2 py-1 rounded-md {step.active ? 'text-blue-700 bg-blue-100' : 'text-gray-400 bg-gray-100'}">{step.date}</p>
					{#if step.active && i === activeSteps - 1}
						<div class="mt-2">
							<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
								<span class="w-1.5 h-1.5 bg-green-400 rounded-full mr-1 animate-pulse"></span>
								Current
							</span>
						</div>
					{/if}
				</div>
			</div>
			
			<!-- Progress Bar -->
			{#if i < trackingSteps.length - 1}
				<div class="flex-1 h-2 mx-6 relative bg-gray-200 rounded-full" style="top: -1.5rem; max-width: 120px;">
					<div class="absolute top-0 left-0 h-2 rounded-full transition-all duration-700 ease-in-out {
						step.active && trackingSteps[i + 1].active 
							? 'bg-gradient-to-r from-blue-500 to-blue-600 w-full shadow-sm' 
							: step.active && !trackingSteps[i + 1].active
							? 'bg-gradient-to-r from-blue-500 to-blue-300 w-1/2'
							: 'w-0'
					}"></div>
					
					{#if step.active && !trackingSteps[i + 1].active}
						<div class="absolute top-1/2 left-1/2 w-2 h-2 bg-blue-500 rounded-full transform -translate-y-1/2 animate-ping"></div>
					{/if}
				</div>
			{/if}
		{/each}
	</div>
	
	<!-- Progress Summary -->
	<div class="mt-8 flex justify-center">
		<div class="bg-white rounded-xl px-6 py-4 shadow-sm border border-gray-100">
			<div class="flex items-center space-x-4">
				<div class="flex items-center">
					<div class="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
					<span class="text-sm font-medium text-gray-700">{activeSteps} of {totalSteps} steps completed</span>
				</div>
				<div class="w-24 bg-gray-200 rounded-full h-2">
					<div class="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500" style="width: {progressPercentage}%"></div>
				</div>
				<span class="text-sm font-semibold text-blue-600">{Math.round(progressPercentage)}%</span>
			</div>
		</div>
	</div>
</div>
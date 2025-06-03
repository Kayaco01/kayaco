<script lang="ts">
	import AnimatedCards from '$lib/components/ui/animated-cards/animated-cards.svelte';
	import { Button } from '$lib/components/ui/button';
	import { MoveRight } from '@lucide/svelte';
	import { ThumbsUpIcon, BriefcaseBusinessIcon, UsersIcon } from '@lucide/svelte';

	const testimonials = [
		{
			src: '/logo/cover.png'
		},
		{
			src: '/img/founders.jpg'
		},
		{
			src: '/img/satamakaba.jpg'
		},
		{
			src: '/img/satamakaba2.png'
		},
		
	];

	let previewImage: HTMLImageElement;

	const cards = [
		{
			title: 'Kaya-Connect',
			category: 'Jobs',
			description: 'Job opportunities for PWDs. Find workplaces with accessible work-environments.',
			imageSrc: '/img/kaya-connect.jpg',
			link: '#',
			previewColor: 'text-blue-700 hover:text-blue-900',
			badgeColor: 'bg-blue-200 text-blue-600',
			cardClass: 'bg-blue-100'
		},
		{
			title: 'K-Mart',
			category: 'Shop',
			description: 'Online shopping made inclusive. Purchase products crafted by PWDs.',
			imageSrc: '/img/k-mart.jpg',
			link: '/kmart',
			previewColor: 'text-orange-700 hover:text-orange-900',
			badgeColor: 'bg-orange-200 text-orange-600',
			cardClass: 'bg-orange-100'
		},
		{
			title: 'K-Pability',
			category: 'Courses',
			description: 'Learn and Upskill. See courses with accessible learning materials.',
			imageSrc: '/img/k-pability.jpg',
			link: '#',
			previewColor: 'text-purple-700 hover:text-purple-900',
			badgeColor: 'bg-purple-200 text-purple-600',
			cardClass: 'bg-purple-100'
		}
	];

	const handleMouseEnter = (image: string) => {
		if (previewImage) previewImage.src = image;
	};
</script>

<section>
	<div class="mt-12 grid grid-cols-1 items-center px-6 lg:mt-12 lg:grid-cols-2 lg:px-24">
		<div class="space-y-6">
			<div class="space-y-6 text-center lg:text-start">
				<div class="text-3xl lg:text-7xl">
					Your Path to <span class="font-bold text-blue-500">Growth</span> and
					<span class="font-bold text-blue-500">Opportunity.</span>
				</div>
				<div class="w-full text-lg text-muted-foreground lg:max-w-lg">
					Empowering persons with disabilities through education, employment, and enterprise with
					KayaCo.
				</div>
			</div>
			<div class="flex items-center justify-center space-x-2 lg:justify-start">
				<Button variant="outline">Learn More</Button>
				<Button class="bg-blue-500 hover:bg-blue-400">Let's Get Started <MoveRight /></Button>
			</div>
		</div>
		<div><AnimatedCards {testimonials} /></div>
	</div>
	<div class=" items-center justify-center"></div>

	<!--arrow section-->
	<div class="-mt-32 hidden lg:block">
		<div class="flex flex-col items-center">
			<div>
				<img src="/img/arrow.png" alt="arrow" class="w-26 ml-32 h-32" />
			</div>
			<div>
				<div class="ml-16 mt-2 text-3xl">
					Our <span class="font-bold text-blue-500">Journey</span>
				</div>
			</div>
		</div>
	</div>
	<div class="mt-6 px-6 lg:px-24">
		<div
			class="grid grid-cols-1 items-center space-y-6 rounded-xl border bg-blue-500 py-8 text-center font-medium text-white lg:grid-cols-3 lg:space-y-2 lg:text-center"
		>
			<div class="flex items-center justify-center gap-2">
				<ThumbsUpIcon class="h-5 w-5 " /> Accessible Courses for All Abilities
			</div>

			<div class="flex items-center justify-center gap-2">
				<BriefcaseBusinessIcon class="h-5 w-5 " /> Pathways to Employment
			</div>

			<div class="flex items-center justify-center gap-2">
				<UsersIcon class="h-5 w-5 " /> Supportive Community
			</div>
		</div>
	</div>

	<div id="features" class="mt-24 space-y-6 px-6 text-center lg:mt-48 lg:px-24 lg:text-start">
		<div class="text-3xl lg:text-6xl">
			What <span class="font-bold text-blue-500">KayaCo</span> can do?
		</div>
	</div>
	<div class="mt-12 flex flex-col gap-8 px-8 md:flex-row lg:px-24">
		<div class="flex-1 space-y-4">
			{#each cards as { title, category, description, imageSrc, link, previewColor, badgeColor, cardClass }}
				<a
					href={link}
					role="button"
					tabindex="0"
					class={`group relative flex transform cursor-pointer flex-col rounded-2xl p-4 text-sm shadow transition-transform hover:scale-105 ${cardClass}`}
					on:mouseenter={() => handleMouseEnter(imageSrc)}
					on:focus={() => handleMouseEnter(imageSrc)}
				>
					<span class={`w-fit rounded-full px-2 py-0.5 text-xs font-bold ${badgeColor}`}>
						{category}
					</span>

					<h2 class="mt-1 text-lg font-bold text-gray-800">{title}</h2>
					<p class="leading-snug text-gray-700">{description}</p>

					<span class={`mt-2 text-sm font-medium underline ${previewColor}`}>
						Learn more →
					</span>
				</a>
			{/each}
		</div>

		<div class="flex flex-1 items-center justify-center">
			<div class="relative h-[26rem] w-full overflow-hidden rounded-3xl bg-white shadow-lg">
				<img
					bind:this={previewImage}
					src={cards[0].imageSrc}
					alt="Preview"
					class="h-full w-full object-cover transition-all duration-500"
				/>
			</div>
		</div>
	</div>
</section>

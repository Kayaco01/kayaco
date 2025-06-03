import { product, category, cart } from '$lib/server/db/schema';
import db from '$lib/server/db';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const userId = locals.user?.id;

	const categories = await db.select().from(category).execute();

	const products = await db
		.select({
			id: product.id,
			title: product.product_name,
			description: product.description,
			price: product.price,
			quantity: product.quantity,
			imageSrc: product.image_url,
			category: category.category_name
		})
		.from(product)
		.leftJoin(category, eq(product.categoryId, category.id))
		.execute();

	let cartItems: 
	{ id: string; productId: string; variant: string; quantity: number; price: string; productName: string | null; imageSrc: string | null; }[] = [];

	if (userId) {
		cartItems = await db
			.select({
				id: cart.id,
				productId: cart.productId,
				variant: cart.variant,
				quantity: cart.quantity,
				price: cart.price,
				productName: product.product_name,
				imageSrc: product.image_url
			})
			.from(cart)
			.leftJoin(product, eq(cart.productId, product.id))
			.where(eq(cart.userId, userId))
			.execute();
	}

	return {
		categories,
		products,
		cartItems 
	};
};

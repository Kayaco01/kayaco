import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { cart, product, category } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { productId } = params;

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
		.where(eq(product.id, productId))
		.execute();

	return {
		productId,
		products
	};
};

export const actions: Actions = {
	addToCart: async ({ request, params, locals }) => {
		const form = await request.formData();
		const variant = form.get('variant') as string;
		const quantity = Number(form.get('quantity') || 1);
		const userId = locals.user?.id;

		if (!userId) {
			throw redirect(303, '/login');
		}

		if (!variant || isNaN(quantity)) {
			return fail(400, { error: 'Invalid form submission.' });
		}

		const productId = params.productId;

		// Fetch product price
		const result = await db
			.select({ price: product.price })
			.from(product)
			.where(eq(product.id, productId))
			.limit(1);

		const productData = result[0];

		if (!productData) {
			return fail(404, { error: 'Product not found' });
		}

		await db.insert(cart).values({
			id: crypto.randomUUID(),
			userId,
			productId,
			variant,
			quantity,
			price: productData.price
		});

		return {
			success: true
		};
	}
};

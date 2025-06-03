import { db } from '$lib/server/db';
import { cart, product } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, depends }) => {
	const userId = locals.user?.id;

	if (!userId) {
		throw redirect(303, '/login');
	}
	depends('app:cart');
	const cartItems = await db
		.select({
			cartId: cart.id,
			productId: product.id,
			name: product.product_name,
			price: cart.price,
			quantity: cart.quantity,
			image: product.image_url
		})
		.from(cart)
		.leftJoin(product, eq(cart.productId, product.id))
		.where(eq(cart.userId, userId));

	return {
		cartItems
	};
};
export const actions: Actions = {
	updateQuantity: async ({ request, locals }) => {
		const userId = locals.user?.id;
		if (!userId) throw redirect(303, '/login');
		const form = await request.formData();
		const cartId = form.get('cartId')?.toString();
		const quantityStr = form.get('quantity')?.toString();
		if (!cartId || !quantityStr) {
			return fail(400, { error: 'Missing cart ID or quantity' });
		}
		const quantity = Number(quantityStr);
		if (isNaN(quantity) || quantity < 1) {
			return fail(400, { error: 'Invalid quantity' });
		}
		try {
			await db
				.update(cart)
				.set({ quantity })
				.where(and(eq(cart.id, cartId), eq(cart.userId, userId)));

			return { success: true };
		} catch (error) {
			console.error('Database error:', error);
			return fail(500, { error: 'Failed to update quantity' });
		}
	},
	deleteItem: async ({ request, locals }) => {
		const userId = locals.user?.id;
		if (!userId) throw redirect(303, '/login');

		const form = await request.formData();
		const cartId = form.get('cartId')?.toString();
		if (!cartId) {
			return fail(400, { error: 'Missing cart ID' });
		}
		try {
			await db.delete(cart).where(and(eq(cart.id, cartId), eq(cart.userId, userId)));
			return { success: true };
		} catch (error) {
			console.error('Database error:', error);
			return fail(500, { error: 'Failed to delete item' });
		}
	},
	clearCart: async ({ locals }) => {
		const userId = locals.user?.id;
		if (!userId) throw redirect(303, '/login');

		try {
			await db.delete(cart).where(eq(cart.userId, userId));
			return { success: true };
		} catch (error) {
			console.error('Database error:', error);
			return fail(500, { error: 'Failed to clear cart' });
		}
	}
};
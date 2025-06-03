import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { superValidate, setError } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { categorySchema } from '$lib/zod-schema';
import db from '$lib/server/db';
import { category } from '$lib/server/db/schema';
import postgres from 'postgres';

export const load: PageServerLoad = async () => {
	const categoryDetails = await db
		.select({
			id: category.id,
			category_name: category.category_name
		})
		.from(category)
		.orderBy(category.category_name);
	return {
		categoryDetails,
		form: await superValidate(zod(categorySchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(categorySchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { category: category_name } = form.data;

		try {
			await db.insert(category).values({
				id: crypto.randomUUID(),
				category_name
			});

			return { success: true };
		} catch (e) {
			if (e instanceof postgres.PostgresError && e.code === '23505') {
				return setError(form, 'category', 'Category already exists');
			}

			console.error('Database error:', e);
			return setError(form, '', 'Unable to add category');
		}
	}
};

import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { productSchema } from '$lib/zod-schema';
import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';
import { product, category } from '$lib/server/db/schema';
import db from '$lib/server/db';
import { v4 as uuidv4 } from 'uuid';
import { eq } from 'drizzle-orm';



export async function load() {
	const categories = await db.select().from(category).execute();

	const products = await db
	.select({
			id: product.id,
			categoryId: product.categoryId,
			product_name: product.product_name,
			description: product.description,
			price: product.price,
			quantity: product.quantity,
			image_url: product.image_url,
			category_name: category.category_name
		})
		.from(product)
		.leftJoin(category, eq(product.categoryId, category.id))
		.execute();

	return {
		form: await superValidate(zod(productSchema)),
		categories,
		products
	};
}

export const actions = {
	product: async ({ request }: { request: Request }) => {
		try {
			const formData = await request.formData();

			const form = await superValidate(formData, zod(productSchema));

			if (!form.valid) {
				console.log('INVALID FORM');
				return fail(400, { form });
			}

			const imageFile = formData.get('image_url') as File | null;
			let image_url = '';

			if (imageFile) {
				if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_KEY || !env.SUPABASE_BUCKET) {
					console.error('Missing Supabase env variables');
					return fail(500, { form, message: 'Server misconfiguration' });
				}

				const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY);
				const bucket = env.SUPABASE_BUCKET;
				const fileName = `${Date.now()}-${imageFile.name}`;
				const fileBuffer = new Uint8Array(await imageFile.arrayBuffer());

				const { error: uploadError } = await supabase.storage
					.from(bucket)
					.upload(`product-photos/${fileName}`, fileBuffer, {
						cacheControl: '3600',
						contentType: imageFile.type,
						upsert: false
					});

				if (uploadError) {
					console.error('Upload failed:', uploadError.message);
					return fail(400, { form, message: 'Failed to upload image.' });
				}

				image_url = `${env.SUPABASE_URL}/storage/v1/object/public/${bucket}/product-photos/${fileName}`;
			} else {
				return fail(400, { form, message: 'Image is required.' });
			}

			const id = uuidv4();
			const categoryId = formData.get('categoryId')?.toString();
			if (!categoryId) {
				return fail(400, { form, message: 'Category is required.' });
			}

			await db.insert(product).values({
				id,
				categoryId,
				product_name: form.data.product_name,
				description: form.data.description,
				price: form.data.price.toString(),
				quantity: form.data.quantity,
				image_url
			});

			return { form };
		} catch (error) {
			console.error('Fatal error in product action:', error);
			return fail(500, { message: 'Internal Server Error' });
		}
	}
};

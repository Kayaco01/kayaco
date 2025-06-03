import type { ColumnDef } from '@tanstack/table-core';
import { renderComponent } from '$lib/components/ui/data-table';

export type Category = {
	id: string;
	category_name: string;
};

export const category: ColumnDef<Category>[] = [
	{
		accessorKey: 'category_name',
		header: 'Category Name'
	}

	// {
	// 	accessorKey: 'id',
	// 	header: '',
	// 	cell: ({ row }) => {
	// 		return renderComponent(DataTableActions, {
	// 			categoryId: row.original.id,
	// 			name: row.original.name
	// 		});
	// 	}
	// }
];

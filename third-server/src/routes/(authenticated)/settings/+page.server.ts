import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import {database} from '$lib/database'
import { ObjectId } from 'mongodb';


export const actions: Actions = {
	logout: async ({ request, locals, cookies }) => {
		const form = await request.formData();

		// TODO: Implement register
		// Check if ustername already exist etc.
		cookies.delete('session')
		throw redirect(302, '/login')

	},
	deleteaccount: async ({ request, locals, cookies }) => {
		
		const user = await database.user.findUnique({
			where: { session: locals.session }
		});

		if (user) {
			const result = await database.user.delete({
				where: {id: user?.id}
			});

			cookies.delete('userid')
		
			throw redirect(302, '/login')
		} else {
			return fail(404, { delete: "error"})
		}
		
	},
};




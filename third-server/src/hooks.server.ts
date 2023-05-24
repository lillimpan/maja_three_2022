import { database } from '$lib/database';
import type { Handle } from '@sveltejs/kit';



// handle runs for every request to the server
export const handle: Handle = async ({ event, resolve }) => {

	let session = event.cookies.get('session');

	if (session) {
		const result = await database.user.findFirst({
			where: { session }
		});
		if (result) {
			event.locals.session = result?.session
		}

	}

	if (event.request.method === "OPTIONS") {
		return new Response(null, {
		headers: {
		"Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
		"Access-Control-Allow-Origin": "*",
		},
		});
		}

		const response = await resolve(event);
		response.headers.append("Access-Control-Allow-Origin", `*`);
		return response;
};


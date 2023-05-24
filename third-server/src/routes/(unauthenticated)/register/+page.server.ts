import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { database } from '$lib/database'
import { fail, redirect } from '@sveltejs/kit';
import * as crypto from "crypto";
import { register_data_form } from '$lib/implementations/auth';
import { auth } from '$lib/auth';

let registered = false;


export const load: PageServerLoad = () => {
	return {
		registered,
	};
}

export const actions: Actions = {
	register: async ({ request, locals, cookies }) => {
		const form = await request.formData();

		const Parse_Register = register_data_form(form)

		if(Parse_Register.is_error){
			return fail(Parse_Register.error.code, Parse_Register.error.data)
		}

		const elog = await auth.register(Parse_Register.success)
		if(elog.is_error){
			return fail(elog.error.code, elog.error.data)
		}

		throw redirect(302, "/")
		// const username = form.get("username")?.toString()
		// const password = form.get("password")?.toString()
		// const repeat_password = form.get("repeat_password")?.toString();

		// if (!username || !password) {
		// 	return fail(400,{message:"Error"})
		// }

		// if(password!=repeat_password){
		// 	return fail(400,{message:"Not matching"})
		// }

		// if (username && password) {
		// 	let users = await database.user.findFirst({ where: { username } });
		// 	if (!users) {
		// 		const session = crypto.randomUUID();
		// 		const salt = crypto.randomBytes(16).toString('hex');
		// 		const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString('hex');

		// 		const user = await database.user.create({
		// 			data: { username, hash, salt, session, clicks: 0 },
		// 		});
		// 		cookies.set("session", user.session, {
		// 			path: "/",
		// 			httpOnly: true,
		// 			sameSite: "strict",
		// 			secure: process.env.NODE_ENV === "production",
		// 			maxAge: 120
		// 		});
		// 		throw redirect(302, "/");
		// 	}
		// }
		// return fail(404, {
		// 	error: "error"
		// });




	},
};

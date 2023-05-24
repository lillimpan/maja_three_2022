import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { database } from '$lib/database'
import * as crypto from "crypto"
import { login_data_form } from '$lib/implementations/auth';
import { auth } from '$lib/auth';

// let login = false;

export const actions: Actions = {
	login: async ({ request, locals, cookies }) => {
		const form = await request.formData();

		const Parse_Login = login_data_form(form)

		if (Parse_Login.is_error) {
			return fail(Parse_Login.error.code, Parse_Login.error.data)
		}

		const elog = await auth.login(Parse_Login.success)
		if(elog.is_error){
			return fail(elog.error.code, elog.error.data)
		}

		cookies.set('session', elog.success.session), {
			path: '/',
			httpOnly: true, // optional for now
			sameSite: 'strict',// optional for now
			secure: process.env.NODE_ENV === 'production',// optional for now
			maxAge: 2200 //
		}

		throw redirect(302, '/');

		// const username = form.get("username")?.toString();
		// const password = form.get("password")?.toString();


		// if (!username) {
		// 	return fail(400, { username: "username missing" });
		// }

		// if (!password) {
		// 	return fail(400, { password: "password missing" });
		// }


		// try {
		// 	const result = await database.user.findFirst({
		// 		where: { username }
		// 	});

		// 	if (!result) {
		// 		return fail(400, {
		// 			message: "Login Failed!"
		// 		});
		// 	}

		// 	const { salt, hash } = result;

		// 	const newhash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

		// 	if (newhash != hash) {
		// 		return fail(400, {
		// 			message: "Login Failedx!",
		// 		});
		// 	}

		// 	const session = crypto.randomUUID();

		// 	const update = await database.user.update({
		// 		where: { id: result.id },
		// 		data: {
		// 			session
		// 		}
		// 	});
		// 	cookies.set('session', session), {
		// 		path: '/',
		// 		httpOnly: true, // optional for now
		// 		sameSite: 'strict',// optional for now
		// 		secure: process.env.NODE_ENV === 'production',// optional for now
		// 		maxAge: 2200 //
		// 	}


		// } catch (e) {
		// 	console.log(e)
		// 	return fail(400, { server: "connection error database" })
		// }
		

	},
};

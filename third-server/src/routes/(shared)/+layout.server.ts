import type { LayoutServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { database } from '$lib/database';


export const load: LayoutServerLoad = async ({ locals, cookies }) => {

    if (locals.session) {
        const user = await database.user.findUnique ({
            where:{session: locals.session}
          });
        return {
            username: user?.username,
        }
    } else {
        throw redirect(302, '/login')
    } 

}
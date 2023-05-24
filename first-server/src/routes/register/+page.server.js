import { error, json } from '@sveltejs/kit';
import { parse } from 'cookie';

import * as database from '$lib/database.js';
import { NewLineKind } from 'typescript';


let registered = false;


/** @type {import('./$types').PageServerLoad} */
export function load() {
    return {
        registered
    };
}

/** @type {import('./$types').Action} */
export async function POST({ request }) {
    const req = await request.formData();

    const username = req.get("username")
    const password = req.get ("password")
    const repeat_password = req.get ("repeat_password")

    const client = await database.connect();
    const db = client.db("test"); 
    const collection = db.collection("users");

    registered = true;

    // function newPage() {
    //     registered = true; 
    //     link
    // }
    
    
    if (req) {
        collection.insertOne({ "username": "Max", "password": "Ebalo" })
    }   
    
    
    const body = { "register - post": "123" }

    const cookies = parse(request.headers.get('cookie') || '');

    console.log(cookies)

}

/** @type {import('./$types').Action} */
export async function DELETE({ request }) {

    const cookies = parse(request.headers.get('cookie') || '');
    console.log(cookies)


/*     const client = await database.connect();
    const db = client.db("test"); */

    const body = { "register - delete": "123" }


}

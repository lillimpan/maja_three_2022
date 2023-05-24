
import { browser } from "$app/environment";
import { database } from '$lib/database'
import { fail, redirect } from "@sveltejs/kit";
import { ObjectId } from 'mongodb';
import { onDestroy } from "svelte";
import type { PageServerLoad, Actions } from "./$types";
import { streams } from "./+server";


export const load: PageServerLoad = async ({ request, locals, cookies }) => {

  // const client = await database.connect();
  // const db = client.db("test"); 
  // const collection = db.collection("users");

  // let user = await collection.findOne({_id: new ObjectId(locals.userid)});


  const user = await database.user.findUnique({
    where: {session: locals.session}
  })

  let users = await database.user.findMany({
    select: {username:true,clicks:true}
  })


  if (!user) {
    return fail(400, {
      user: "Login Failed!"
    });
  }


  users = users.filter((user) => user.clicks != undefined)
  users.sort((first_user, second_user) => second_user.clicks - first_user.clicks)
  let temp = users.slice(0, 5)



  return { clicks: user?.clicks ?? 0,users: temp};

};

/* export const actionss: Actions = {
  click: async ({ request, locals, cookies }) => {

    const client = await database.connect();
    const db = client.db("test");
    const collection = db.collection("users");

    let user = await collection.findOne({ _id: new ObjectId(locals.userid) });
    if (!user) {
      throw redirect(302, '/login')
    }

    let updated = await collection.findOneAndUpdate({ _id: new ObjectId(locals.userid) }, { $inc: { clicks: 1 } })



    if (!updated.ok) {
      return fail(400, { message: "user not updated" })
    }

    const { username, clicks } = updated.value as any

    // loop over all connected streams
    // enqueue username and score so connected users can get updates of that users score.

    for (const session in streams) {
      // send messages to all other streams exept own for this chat
      const connection = streams[session];
      if (session != locals.session) {
        // enqueue messages to all streams for this chat 

        connection.controller.enqueue(JSON.stringify({ username, clicks }));
      }
    }



  }


} */

// export const actions: Actions = {
//   click: async ({ locals, request}) => {
//     const user = await database.user.findUnique ({
//       where:{session: locals.session}
//     });
//     if (!user) {
//       throw redirect(302, '/login')
//      }

//      const click = await database.user.update({
//       where: {username: user.username}, data: {clicks: user.clicks + 1}
//      })

//      const { username, clicks } = click


//      for (const session in streams) {
//       const connection = streams[session];
//       if (session != locals.session) {
//         connection.controller.enqueue(JSON.stringify({ username, clicks }));
//       }
//     }

//   }
// }
export const actions: Actions = {
  click: async ({ locals, request }) => {
    const user = await database.user.findUnique({
      where: { session: locals.session },
    });
    if (!user) {
      throw redirect(302, '/login');
    }
    

    const click = await database.user.update({
      where: { username: user.username },
      data: { clicks: user.clicks + 1 },
    });

    const { username, clicks } = click;

    for (const session in streams) {
      const connection = streams[session];
      if (session !== locals.session) {
        connection.controller.enqueue(JSON.stringify({ username, clicks }));
      }
    }
  },
};
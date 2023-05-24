import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const streams: Record<
    string,
    { controller: ReadableStreamDefaultController<string>; }
> = {};

export const GET: RequestHandler = async ({ locals, params }) => {


    const stream = new ReadableStream<string>({
        start(controller) {
            /* save the controller for the stream so that we can */
            /* enqueue messages into the stream */
            streams[locals.session!] = { controller };
        },
        cancel() {
            /* remove the stream */
            delete streams[locals.session!];
        },
    });

    return new Response(stream, {
        headers: {
            "content-type": "text/event-stream",
        },
    });

};
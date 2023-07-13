import Env from "./env";
import { snedMessage } from "./tgapi";


function isNumeric(value: string) {
    return /^\d+$/.test(value);
}

export async function push(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    if (request.method !== "GET") {
        return new Response("method not allowed", { status: 405 });
    }

    if (await env.db.get("INSTALL") !== "TRUE") {
        return new Response("not installed", { status: 400 });
    }

    // validate key
    const params = new URL(request.url).searchParams;
    if (params.get("msg") === null || params.get("msg") === "") {
        return new Response("empty message", { status: 400 });
    }

    const fullkey = params.get("key");
    if (fullkey === null || fullkey === "") {
        return new Response("unauthorized: empty key", { status: 401 });
    }

    // format: [chat id]:[push key]
    const splits = fullkey.split("-");
    if (splits.length !== 2) {
        return new Response("unauthorized: wrong format", { status: 401 });
    }

    if (!isNumeric(splits[0])) {
        return new Response("unauthorized: invalid chat id", { status: 401 });
    }

    const chatid = Number.parseInt(splits[0]);
    const key = splits[1];

    if (await env.db.get("CHAT-" + chatid) !== key) {
        return new Response("unauthorized: invalid key", { status: 401 });
    }

    // send message
    await snedMessage(await env.db.get("TG_KEY") || "", chatid, params.get("msg") || "");

    return new Response("ok");
}
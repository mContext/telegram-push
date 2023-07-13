import { htmlResponse } from "./common";
import Env from "./env"
import { INFO_HTML, INSTALL_HTML, renderInfo } from "./html/html"

export async function install(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    if (await env.db.get("INSTALL") === "TRUE") {
        return htmlResponse(renderInfo("Already installed"));
    }
    
    if (request.method === "GET") {
        return htmlResponse(INSTALL_HTML);
    }

    if (request.method !== "POST") {
        return new Response("method not allowed", { status: 405 });
    }

    const body = await request.formData();
    const tgkey = body.get("tgkey") || "";
    const workerURL = body.get("worker-url") || "";

    // get bot info
    const getMe = await fetch(`https://api.telegram.org/bot${tgkey}/getMe`);
    const getMeData = await getMe.json() as any;
    if (!getMeData.ok) {
        return htmlResponse(renderInfo("Installation failed\nInvalid key: " + getMeData.description));
    }

    const username: string = getMeData.result.username;

    // set webhook
    const webhookToken = crypto.randomUUID();
    const setWebhook = await fetch(`https://api.telegram.org/bot${tgkey}/setWebhook`, {
        method: "POST",
        body: JSON.stringify({
            "url": workerURL + "/webhook",
            "secret_token": webhookToken
        }),
        headers: {
            "content-type": "application/json"
        }
    })
    const setWebhookData = await setWebhook.json() as any;
    if (!setWebhookData.ok) {
        return htmlResponse(renderInfo("Installation failed\n Set webhook: " + setWebhookData.description));
    }

    await env.db.put("WEBHOOK_TOKEN", webhookToken);
    await env.db.put("WORKER_URL", workerURL);
    await env.db.put("TG_KEY", tgkey);
    await env.db.put("BOT_USERNAME", username);
    await env.db.put("INSTALL", "TRUE");

    return htmlResponse(renderInfo(`Install successfully\nBot username: ${username}`));

}
import * as install from "./install"
import Env from "./env"
import * as webhook from "./webhook";
import * as push from "./push";

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		let url = new URL(request.url);

		switch (url.pathname) {
			case "/":
				if (await env.db.get("INSTALL") === "TRUE") {
					return Response.redirect("https://t.me/" + await env.db.get("BOT_USERNAME"));
				} else {
					return Response.redirect(`https://${url.host}/install`, 302);
				}

			case "/install":
				return install.install(request, env, ctx);

			case "/webhook":
				return webhook.webhook(request, env, ctx);

			case "/push":
				return push.push(request, env, ctx);

			default:
				return new Response("404 not found", {
					status: 404
				})
		}
	},
};

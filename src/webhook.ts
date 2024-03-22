import Env from './env';
import * as tgapi from './tgapi';

function randomString(n: number) {
	return Array.from(crypto.getRandomValues(new Uint8Array(n))).map((i) => i.toString(16).padStart(2, '0')).join('');
}

export async function webhook(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
	if (await env.db.get('INSTALL') !== 'TRUE') {
		return new Response('not installed', { status: 400 });
	}

	if (request.method !== 'POST') {
		return new Response('method not allowed', { status: 405 });
	}

	const webhookToken = await env.db.get('WEBHOOK_TOKEN');
	if (webhookToken !== request.headers.get('X-Telegram-Bot-Api-Secret-Token')) {
		return new Response('unauthorized', { status: 401 });
	}

	// process update
	const update = await request.json() as any;
	if (update.message === undefined || update.message.text === undefined) {
		// ignore non text messages
		return new Response('ok');
	}
	if (update.message.chat.type !== 'private') {
		// ignore non private messages
		return new Response('ok');
	}

	// process commands
	const tgkey = await env.db.get('TG_KEY') || '';
	const chatid = update.message.chat.id as number;

	const message = update.message.text as string;
	const splits = message.split(' ');
	switch (splits[0]) {
		case '/ping':
			if (splits.length == 1) {
				await tgapi.snedMessage(tgkey, chatid, '/ping agentID 或直接发送agentID');
			} else if (splits.length > 1) {
				await tgapi.snedMessage(tgkey, chatid, 'https://link.ingress.com/?link=https://intel.ingress.com/agent/' + splits[1]);
			}


			break;

		case '/new':
			// generate new push key
			const workerURL = await env.db.get('WORKER_URL') || '';
			const pushkey = randomString(6);
			await env.db.put('CHAT-' + chatid, pushkey);
			let fullpushkey = chatid.toString() + '-' + pushkey;
			await tgapi.snedMessage(tgkey, chatid, `Your new push key is \`${fullpushkey}\`. Example usage: \`${workerURL}/push?key=${fullpushkey}&msg=Hello\` (Click to copy).`);
			break;

		case '/start':
			await tgapi.snedMessage(tgkey, chatid, 'Use /new to generate your push key.');
			break;

		default:
			await tgapi.snedMessage(tgkey, chatid, 'https://link.ingress.com/?link=https://intel.ingress.com/agent/' + splits[0]);
			break;
	}

	return new Response('ok');
}

export function snedMessage(tgkey: string, chatid: number, msg: string): Promise<Response> {
    return fetch(`https://api.telegram.org/bot${tgkey}/sendMessage`, {
        method: "POST",
        body: JSON.stringify({
            "chat_id": chatid,
            "text": msg,
            "parse_mode": "Markdown"
        }),
        headers: {
            "content-type": "application/json"
        }
    })
}
export function htmlResponse(body: BodyInit) {
    return new Response(body, {
        headers: {
            "content-type": "text/html"
        }
    });
}
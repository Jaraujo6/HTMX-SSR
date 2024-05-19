import { init } from "../app.js";
export const handler = async (event, context) => {
    const server = init();
    try {
        const result = await server.inject({
            method: event.httpMethod,
            url: event.path,
            payload: event.body ?? undefined
        });
        return {
            body: result.body,
            headers: result.headers,
            statusCode: result.statusCode,
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
//# sourceMappingURL=server.js.map
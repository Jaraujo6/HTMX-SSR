import type { Handler } from "@netlify/functions"
import { HTTPMethods } from "fastify"

import { init } from "../app.mjs"

export const handler: Handler = async (event, context) => {
  const server = init()

  try {
    type Method = HTTPMethods | undefined
    const result = await server.inject({
      method: event.httpMethod as any,
      url: event.path,
      payload: event.body ?? undefined
    })

    return {
      body: result.body,
      headers: result.headers as any,
      statusCode: result.statusCode,
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
}

import { Server } from 'http';
import { Context, APIGatewayProxyEvent } from 'aws-lambda';
import * as express from 'express';
import { createServer, proxy, Response } from 'aws-serverless-express';

import { createApp } from './app';

let cachedServer: Server;

async function bootstrap(): Promise<Server> {
  const expressApp = express();

  const app = await createApp(expressApp);
  await app.init();

  return createServer(expressApp);
}

export async function handler(
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<Response> {
  if (!cachedServer) {
    const server = await bootstrap();
    cachedServer = server;
  }
  console.log({ event, context });
  return proxy(cachedServer, event, context, 'PROMISE').promise;
}

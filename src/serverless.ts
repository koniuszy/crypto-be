import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { INestApplication } from '@nestjs/common';

import { Server } from 'http';
import * as express from 'express';
import { Context, APIGatewayProxyEvent } from 'aws-lambda';
import { createServer, proxy, Response } from 'aws-serverless-express';

import { AppModule } from './app.module';

export async function createApp(
  expressApp: express.Express,
): Promise<INestApplication> {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  return app;
}

let cachedServer: Server;

async function bootstrap(): Promise<Server> {
  const expressApp = express();

  const app = await createApp(expressApp);
  app.enableCors();
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

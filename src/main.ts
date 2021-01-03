import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';

import { AppModule } from './app.module';

global.fetch = require('node-fetch');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const defaultDirectives = helmet.contentSecurityPolicy.getDefaultDirectives();

  const directives =
    process.env.NODE === 'production'
      ? defaultDirectives
      : {
          ...defaultDirectives,

          // for /graphql playground
          'script-src': ["'self'", 'cdn.jsdelivr.net', "'unsafe-inline'"],
          'img-src': ["'self'", 'cdn.jsdelivr.net', 'data:'],
        };

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives,
      },
    }),
  );

  await app.listen(process.env.PORT || 5000);
}
bootstrap();

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { BTCModule } from './btc/btc.module';
import { RestModule } from './rest/rest.module';

global.fetch = require('node-fetch');

@Module({
  imports: [
    RestModule,
    BTCModule,
    GraphQLModule.forRoot({
      autoSchemaFile:
        process.env.NODE === 'production' ? 'src/schema.gql' : true,
      sortSchema: true,
    }),
  ],
})
export class AppModule {}

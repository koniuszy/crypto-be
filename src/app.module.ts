import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { BTCModule } from './btc/btc.module';

global.fetch = require('node-fetch');

@Module({
  imports: [
    BTCModule,
    GraphQLModule.forRoot({
      autoSchemaFile:
        process.env.NODE === 'production' ? 'src/schema.gql' : true,
      sortSchema: true,
    }),
  ],
})
export class AppModule {}

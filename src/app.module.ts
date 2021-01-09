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
      autoSchemaFile: 'src/schema.gql',
      sortSchema: true,
    }),
  ],
})
export class AppModule {}

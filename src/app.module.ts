import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { BTCModule } from './btc/btc.module';

@Module({
  imports: [
    BTCModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/schema.gql',
      sortSchema: true,
    }),
  ],
})
export class AppModule {}

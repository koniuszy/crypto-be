import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { CatsModule as LegacyRestApiCatsModule } from './cats/cats.module';
import { BTCModule } from './btc/btc.module';

@Module({
  imports: [
    BTCModule,
    LegacyRestApiCatsModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/schema.gql',
      sortSchema: true,
    }),
  ],
})
export class AppModule {}

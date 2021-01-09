import { Module } from '@nestjs/common';

import { RestResolver } from './rest.resolver';
import { RestController } from './rest.controller';

@Module({
  providers: [RestResolver],
  controllers: [RestController],
})
export class RestModule {}

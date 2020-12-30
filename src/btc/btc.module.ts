import { Module } from '@nestjs/common';
import { BTCResolver } from './btc.resolver';
import { BTCService } from './btc.service';

@Module({
  providers: [BTCResolver, BTCService],
})
export class BTCModule {}

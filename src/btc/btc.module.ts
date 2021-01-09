import { Module } from '@nestjs/common';
import { BTCResolver } from './btc.resolver';
import { BTCService } from './btc.service';
import { BtcController } from './btc.controller';

@Module({
  providers: [BTCResolver, BTCService],
  controllers: [BtcController],
})
export class BTCModule {}

import {
  Controller,
  Get,
  UnprocessableEntityException,
  Query,
} from '@nestjs/common';

import { BTCService } from './btc.service';
import { BTC } from './btc.model';

@Controller('btc')
export class BtcController {
  constructor(private BTCService: BTCService) {}

  @Get()
  async getBtcMarketData(@Query() query): Promise<BTC> {
    const amount = query.amount ? Number(query.amount) : null;

    if (!amount)
      throw new UnprocessableEntityException({
        error: 'params "amount" is invalid.',
      });

    return await this.BTCService.getMarketData(Number(query.amount));
  }
}

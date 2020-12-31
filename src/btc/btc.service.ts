import { Injectable } from '@nestjs/common';
import { BTC } from './btc.model';

@Injectable()
export class BTCService {
  async getMarketData(amount: number): Promise<BTC> {
    return {
      amount,
      bestMarket: 'binance',
      usdValue: 100,
      date: new Date().toString(),
    };
  }
}

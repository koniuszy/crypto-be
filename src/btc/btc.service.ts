import { Injectable } from '@nestjs/common';
import { BTC } from './btc.model';

@Injectable()
export class BTCService {
  async getMarketData(amount: number): Promise<BTC> {
    return { amount: 0, bestMarket: 'binance', usdValue: 100 };
  }
}

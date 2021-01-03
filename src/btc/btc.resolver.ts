import { Resolver, Query, Args, Float } from '@nestjs/graphql';

import { BTCService } from './btc.service';
import { BTC } from './btc.model';

@Resolver(() => BTC)
export class BTCResolver {
  constructor(private BTCService: BTCService) {}

  @Query(() => BTC)
  async btcMarketData(@Args('amount', { type: () => Float }) amount: number) {
    return this.BTCService.getMarketData(amount);
  }
}

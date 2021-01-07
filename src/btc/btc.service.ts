import { Injectable } from '@nestjs/common';

import { BTC } from './btc.model';

import getBinanceData from './lib/binance';
import getCoinbaseData from './lib/coinbase';
import getBitbayData from './lib/bitbay';
import { getErrorMessageList } from './lib/helpers';

// bid => 34144.91000000
// ask => 34144.92000000

@Injectable()
export class BTCService {
  async getMarketData(btcAmount: number): Promise<BTC> {
    const date = new Date().toLocaleTimeString();

    const data = await Promise.all([
      getBinanceData({ btcAmount }),
      getCoinbaseData({ btcAmount }),
      getBitbayData({ btcAmount }),
    ]);

    const errorMessageList = getErrorMessageList({ data, btcAmount });

    const bidsData = data.filter(({ btcSumBids }) => btcSumBids === btcAmount);
    const asksData = data.filter(({ btcSumAsks }) => btcSumAsks === btcAmount);

    bidsData.sort((a, b) => b.usdBidsValue - a.usdBidsValue);
    asksData.sort((a, b) => a.usdAsksValue - b.usdAsksValue);

    const [bestBidsMarket] = asksData;
    const [bestAsksMarket] = asksData;

    return {
      date,
      btcAmount,
      errorMessageList,
      bestBidsMarket: {
        name: bestBidsMarket ? bestBidsMarket.name : null,
        usdValue: bestBidsMarket ? bestBidsMarket.usdBidsValue : null,
      },
      bestAsksMarket: {
        name: bestAsksMarket ? bestAsksMarket.name : null,
        usdValue: bestAsksMarket ? bestAsksMarket.usdAsksValue : null,
      },
    };
  }
}

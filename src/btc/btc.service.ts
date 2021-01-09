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

    const [bestBidsMarket] = bidsData.sort(
      (a, b) => b.usdBidsValue - a.usdBidsValue,
    );
    const [bestAsksMarket] = asksData.sort(
      (a, b) => a.usdAsksValue - b.usdAsksValue,
    );

    return {
      date,
      btcAmount,
      errorMessageList,
      bestBidsMarketName: bestBidsMarket ? bestBidsMarket.name : null,
      bestAsksMarketName: bestAsksMarket ? bestAsksMarket.name : null,
      bidsUsdValue: bestBidsMarket ? bestBidsMarket.usdBidsValue : null,
      asksUsdValue: bestAsksMarket ? bestAsksMarket.usdAsksValue : null,
    };
  }
}

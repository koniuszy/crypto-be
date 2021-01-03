import { MarketData, MarketNames } from '../types';
import { getOrderBookValues } from './helpers';

async function getBitbayData({
  btcAmount,
}: {
  btcAmount: number;
}): Promise<MarketData> {
  const response = await fetch(
    'https://bitbay.net/API/Public/BTC/orderbook.json',
  );

  const { bids, asks } = await response.json();

  const [usdBidsValue, btcSumBids] = getOrderBookValues({
    btcAmount,
    orderBookValueList: bids,
  });
  const [usdAsksValue, btcSumAsks] = getOrderBookValues({
    btcAmount,
    orderBookValueList: asks,
  });

  return {
    usdBidsValue,
    btcSumBids,
    usdAsksValue,
    btcSumAsks,
    name: MarketNames.bitbay,
  };
}

export default getBitbayData;

import { MarketData, MarketNames } from '../types';
import { getOrderBookValues } from './helpers';

async function getCoinbaseData({
  btcAmount,
}: {
  btcAmount: number;
}): Promise<MarketData> {
  const level = btcAmount <= 2 ? 2 : 3;
  const response = await fetch(
    `https://api.prime.coinbase.com/products/BTC-USD/book?level=${level}`,
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
    name: MarketNames.coinbase,
  };
}

export default getCoinbaseData;

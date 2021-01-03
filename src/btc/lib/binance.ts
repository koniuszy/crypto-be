import { MarketData, MarketNames } from '../types';
import { getOrderBookValues } from './helpers';

function getOrderBookLimit({
  btcAmount,
  retry,
}: {
  btcAmount: number;
  retry: number;
}): string {
  const limitList = [20, 50, 100, 500, 1000, 5000];
  let limitIndex = 0;

  if (btcAmount > 100) limitIndex = 5;
  if (btcAmount > 50) limitIndex = 4;
  if (btcAmount > 25) limitIndex = 3;
  if (btcAmount >= 5) limitIndex = 2;
  if (btcAmount >= 2) limitIndex = 1;

  return limitList[limitIndex + retry].toString();
}

async function getBinanceData({
  btcAmount,
  retry = 0,
}: {
  btcAmount: number;
  retry?: number;
}): Promise<MarketData> {
  const url = new URL('https://api.binance.com/api/v3/depth');
  const limit = getOrderBookLimit({ btcAmount, retry });
  url.searchParams.append('limit', limit);
  url.searchParams.append('symbol', 'BTCUSDT');

  const response = await fetch(url.toString());
  const { bids, asks } = await response.json();

  const [usdBidsValue, btcSumBids] = getOrderBookValues({
    btcAmount,
    orderBookValueList: bids,
  });
  const [usdAsksValue, btcSumAsks] = getOrderBookValues({
    btcAmount,
    orderBookValueList: asks,
  });

  if ((btcSumAsks < btcAmount || btcSumAsks < btcAmount) && limit !== '5000') {
    return await getBinanceData({ btcAmount, retry: retry + 1 });
  }

  return {
    usdBidsValue,
    btcSumBids,
    usdAsksValue,
    btcSumAsks,
    name: MarketNames.binance,
  };
}

export default getBinanceData;

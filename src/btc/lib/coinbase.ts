import { MarketData, MarketNames } from '../types';
import { getOrderBookValues } from './helpers';

/* SAMPLES
coinbaseBids = [['32605.61', '0.58046258', '51d2185c-2275-4bd0-8376-29a3023c92ae']]
coinbaseAsks = [['32609.32', '0.06592128', 'e787d764-3395-43ec-9e1f-f44291dd3c75']]
*/

type PricePerOne = string;
type Amount = string;
type ID = string;

type CoinbaseResources = {
  bids: [PricePerOne, Amount, ID][];
  asks: [PricePerOne, Amount, ID][];
};

async function getCoinbaseData({
  btcAmount,
}: {
  btcAmount: number;
}): Promise<MarketData> {
  const level = btcAmount <= 2 ? 2 : 3;
  const response = await fetch(
    `https://api.prime.coinbase.com/products/BTC-USD/book?level=${level}`,
  );
  const { bids, asks }: CoinbaseResources = await response.json();

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

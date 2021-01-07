import { MarketData, MarketNames } from '../types';
import { getOrderBookValues } from './helpers';

/* SAMPLES
bids = [[31412.26, 0.40318347]];
asks = [[32851.15, 0.01332502]];
*/

type PricePerOne = number;
type Amount = number;

type BibtayResources = {
  bids: [PricePerOne, Amount][];
  asks: [PricePerOne, Amount][];
};

async function getBitbayData({
  btcAmount,
}: {
  btcAmount: number;
}): Promise<MarketData> {
  const response = await fetch(
    'https://bitbay.net/API/Public/BTC/orderbook.json',
  );

  const { bids, asks }: BibtayResources = await response.json();

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

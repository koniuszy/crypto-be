export enum MarketNames {
  binance = 'binance',
  coinbase = 'coinbase',
  bitbay = 'bitbay',
}

export type MarketData = {
  usdBidsValue: number;
  usdAsksValue: number;
  btcSumBids: number;
  btcSumAsks: number;
  name: MarketNames;
};

export type BestMarketResponse = {
  name: MarketData['name'];
  usdValue: number;
};

import { getOrderBookValues } from './helpers';

type PricePerOne = number;
type Amount = number;

type BibtayResources = {
  bids: [PricePerOne, Amount][];
  asks: [PricePerOne, Amount][];
};

//sample from bitbay
const bids: BibtayResources['bids'] = [
  [31412.26, 0.40318347],
  [31412.25, 0.1],
  [31200, 0.00080128],
  [31000, 0.00321806],
  [30900, 0.0162712],
  [30514.46, 0.4],
  [29501.1, 0.00376257],
  [29300.02, 0.08859038],
  [29001.1, 0.00382744],
];

describe('getOrderBookValues', () => {
  it('returns values for 1BTC', () => {
    const [bidsSample] = bids;
    const [pricePerOne, btcAmount] = bidsSample;

    const [usdValue, btcSum] = getOrderBookValues({
      btcAmount,
      orderBookValueList: bids,
    });

    expect(btcSum).toEqual(btcAmount);
    expect(usdValue).toEqual(pricePerOne * btcAmount);
  });
});

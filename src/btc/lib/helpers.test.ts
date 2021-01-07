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
  [28501.01, 0.0038946],
  [28500.04, 0.02191085],
  [28500.02, 0.09107713],
  [28500, 0.06399333],
  [28340.0, 0.01752752],
  [28260, 0.10531812],
  [28001.1, 0.00396413],
  [28000, 0.00017893],
  [27999.99, 0.05420288],
];

describe('getOrderBookValues', () => {
  it(`checks USD value for ${bids[0][1]}BTC`, () => {
    const [bidsSample] = bids;
    const [pricePerOne, btcAmount] = bidsSample;

    const [usdValue, btcSum] = getOrderBookValues({
      btcAmount,
      orderBookValueList: bids,
    });

    expect(btcSum).toEqual(btcAmount);
    expect(usdValue).toEqual(pricePerOne * btcAmount);
  });
  it('checks USD value for 1BTC', () => {
    const [usdValue, btcSum] = getOrderBookValues({
      btcAmount: 1,
      orderBookValueList: bids,
    });

    expect(btcSum).toEqual(1);
  });
});

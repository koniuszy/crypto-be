import { getOrderBookValues } from './helpers';

type PricePerOne = number;
type Amount = number;

type Resources = {
  bids: [PricePerOne, Amount][];
  asks: [PricePerOne, Amount][];
};

const bids: Resources['bids'] = [
  [100, 0.3],
  [101, 0.3],
  [102, 0.3],
  [103, 0.3],
  [104, 0.3],
  [105, 0.3],
];

describe('getOrderBookValues', () => {
  it(`checks USD value for 0.3BTC`, () => {
    const [usdValue, btcSum] = getOrderBookValues({
      btcAmount: 0.3,
      orderBookValueList: bids,
    });

    expect(btcSum).toEqual(0.3);
    expect(usdValue).toEqual(30);
  });

  it('checks USD value for 0.9BTC', () => {
    const [usdValue, btcSum] = getOrderBookValues({
      btcAmount: 0.9,
      orderBookValueList: bids,
    });

    expect(btcSum).toEqual(0.9);
    expect(usdValue).toEqual(90.9);
  });

  it('checks USD value for 1BTC', () => {
    const [usdValue, btcSum] = getOrderBookValues({
      btcAmount: 1,
      orderBookValueList: bids,
    });

    expect(btcSum).toEqual(1);
    expect(usdValue).toEqual(90.9 + 10.3);
  });

  it('checks USD value for 2BTC', () => {
    const [usdValue, btcSum] = getOrderBookValues({
      btcAmount: 2,
      orderBookValueList: bids,
    });

    expect(btcSum).toEqual(1.8);
    expect(usdValue).toEqual(184.5);
  });
});

import { MarketData } from '../types';

function thousandSeparate(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function prettifyNumber(number: number, toFixed?: number) {
  return thousandSeparate(Number(number.toFixed(toFixed || 2))).replace(
    '.',
    ',',
  );
}

export function getErrorMessageList({
  data,
  btcAmount,
}: {
  data: MarketData[];
  btcAmount: number;
}): string[] {
  const errorMessageList = [];

  data.forEach(
    ({ btcSumAsks, btcSumBids, name, usdAsksValue, usdBidsValue }) => {
      if (btcAmount > btcSumAsks)
        errorMessageList.push(
          `${name}-market could fetch data only for ${prettifyNumber(
            btcSumAsks,
          )} BTC asks for ${prettifyNumber(usdAsksValue)} $`,
        );

      if (btcAmount > btcSumBids)
        errorMessageList.push(
          `${name}-market could fetch data only for ${prettifyNumber(
            btcSumBids,
          )} BTC bids for ${prettifyNumber(usdBidsValue)} $`,
        );
    },
  );

  return errorMessageList;
}

function roundNumber(num: number) {
  return Number(num.toFixed(10));
}
export function getOrderBookValues({
  btcAmount,
  orderBookValueList,
}: {
  btcAmount: number;
  orderBookValueList: string[][] | number[][];
}): [number, number] {
  let usdValue = 0;
  let btcSum = 0;
  let index = 0;

  while (btcSum < btcAmount && index < orderBookValueList.length) {
    const [stringPrice, stringAmount] = orderBookValueList[index];
    const price = Number(stringPrice);
    const amount = Number(stringAmount);

    const willContinue = btcSum + amount < btcAmount;
    const amountToBeAdded = willContinue ? amount : btcAmount - btcSum;

    btcSum += amountToBeAdded;
    usdValue += price * amountToBeAdded;
    index++;

    btcSum = roundNumber(btcSum);
    usdValue = roundNumber(usdValue);
  }

  return [usdValue, btcSum];
}

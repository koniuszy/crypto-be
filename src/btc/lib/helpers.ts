import { MarketData } from '../types';

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
          `${name}-market could fetch data only for ${btcSumAsks} BTC asks for ${usdAsksValue} $`,
        );

      if (btcAmount > btcSumBids)
        errorMessageList.push(
          `${name}-market could fetch data only for ${btcSumBids} BTC bids for ${usdBidsValue} $`,
        );
    },
  );

  return errorMessageList;
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
    const price = Number(orderBookValueList[index][0]);
    const amount = Number(orderBookValueList[index][1]);
    const shouldContinue = btcSum + amount < btcAmount;

    if (shouldContinue) {
      usdValue += price;
      btcSum += amount;
      index++;
    }

    if (!shouldContinue) {
      const missingAmount = btcAmount - btcSum;
      btcSum += missingAmount;
      usdValue += missingAmount * price;
    }
  }

  return [usdValue, btcSum];
}

import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BTC {
  @Field(() => Int)
  amount: number;

  @Field(() => Int)
  usdValue: number;

  @Field()
  date: string;

  @Field()
  bestMarket: 'binance' | 'coinbase' | 'coindesk';
}

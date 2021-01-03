import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MarketNames } from './types';

@ObjectType()
class BestMarket {
  @Field()
  name: MarketNames;

  @Field(() => Int)
  usdValue: number;
}

@ObjectType()
export class BTC {
  @Field()
  date: string;

  @Field(() => Int)
  btcAmount: number;

  @Field(() => [String])
  errorMessageList: string[];

  @Field()
  bestBidsMarket: BestMarket;
  @Field()
  bestAsksMarket: BestMarket;
}

import { Field, Float, ObjectType } from '@nestjs/graphql';
import { MarketNames } from './types';

@ObjectType()
class BestMarket {
  @Field()
  name: MarketNames;

  @Field(() => Float)
  usdValue: number;
}

@ObjectType()
export class BTC {
  @Field()
  date: string;

  @Field(() => Float)
  btcAmount: number;

  @Field(() => [String])
  errorMessageList: string[];

  @Field()
  bestBidsMarket: BestMarket;
  @Field()
  bestAsksMarket: BestMarket;
}

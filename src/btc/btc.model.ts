import { Field, Float, ObjectType } from '@nestjs/graphql';
import { MarketNames } from './types';

@ObjectType()
class BestMarket {
  @Field(() => MarketNames, { nullable: true })
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

  @Field(() => BestMarket)
  bestBidsMarket: BestMarket;

  @Field()
  bestAsksMarket: string;
}

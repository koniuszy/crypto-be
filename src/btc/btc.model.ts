import { Field, Float, ObjectType } from '@nestjs/graphql';
import { MarketNames } from './types';

@ObjectType()
export class BTC {
  @Field()
  date: string;

  @Field(() => Float)
  btcAmount: number;

  @Field(() => [String])
  errorMessageList: string[];

  @Field(() => [MarketNames])
  markets: MarketNames[];

  @Field(() => MarketNames, { nullable: true })
  bestBidsMarketName: MarketNames | null;

  @Field(() => MarketNames, { nullable: true })
  bestAsksMarketName: MarketNames | null;

  @Field(() => Float, { nullable: true })
  bidsUsdValue: number | null;

  @Field(() => Float, { nullable: true })
  asksUsdValue: number | null;
}

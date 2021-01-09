import { Test, TestingModule } from '@nestjs/testing';
import { BTCResolver } from './btc.resolver';

describe('RestResolver', () => {
  let resolver: BTCResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BTCResolver],
    }).compile();

    resolver = module.get<BTCResolver>(BTCResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

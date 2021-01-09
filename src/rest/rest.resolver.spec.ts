import { Test, TestingModule } from '@nestjs/testing';
import { RestResolver } from './rest.resolver';

describe('RestResolver', () => {
  let resolver: RestResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestResolver],
    }).compile();

    resolver = module.get<RestResolver>(RestResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

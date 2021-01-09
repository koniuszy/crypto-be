import { Test, TestingModule } from '@nestjs/testing';
import { BTCService } from './btc.service';

describe('BTCService', () => {
  let service: BTCService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BTCService],
    }).compile();

    service = module.get<BTCService>(BTCService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

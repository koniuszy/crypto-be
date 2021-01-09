import { Test, TestingModule } from '@nestjs/testing';
import { BtcController } from './btc.controller';

describe('BtcController', () => {
  let controller: BtcController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BtcController],
    }).compile();

    controller = module.get<BtcController>(BtcController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

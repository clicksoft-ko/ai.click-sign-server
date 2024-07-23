import { Test, TestingModule } from '@nestjs/testing';
import { HsGateway } from '../hs.gateway';
import { HsService } from '../hs.service';

describe('HsGateway', () => {
  let gateway: HsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HsGateway, HsService],
    }).compile();

    gateway = module.get<HsGateway>(HsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { HsService } from '../hs.service';

describe('HsService', () => {
  let service: HsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HsService],
    }).compile();

    service = module.get<HsService>(HsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

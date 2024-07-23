import { Test, TestingModule } from '@nestjs/testing';
import { ClickDeskService } from '../click-desk.service';

describe('ClickDeskService', () => {
  let service: ClickDeskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClickDeskService],
    }).compile();

    service = module.get<ClickDeskService>(ClickDeskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

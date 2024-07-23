import { Test, TestingModule } from '@nestjs/testing';
import { ClickDeskGateway } from '../click-desk.gateway';
import { ClickDeskService } from '../click-desk.service';

describe('ClickDeskGateway', () => {
  let gateway: ClickDeskGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClickDeskGateway, ClickDeskService],
    }).compile();

    gateway = module.get<ClickDeskGateway>(ClickDeskGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});

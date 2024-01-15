import { Test, TestingModule } from '@nestjs/testing';
import { SockSignService } from '../sock-sign.service';

describe('SockSignService', () => {
  let service: SockSignService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SockSignService],
    }).compile();

    service = module.get<SockSignService>(SockSignService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

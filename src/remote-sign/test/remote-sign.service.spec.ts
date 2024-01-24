import { Test, TestingModule } from '@nestjs/testing';
import { RemoteSignService } from '../remote-sign.service';

describe('RemoteSignService', () => {
  let service: RemoteSignService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemoteSignService],
    }).compile();

    service = module.get<RemoteSignService>(RemoteSignService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { RemoteSignGateway } from '../remote-sign.gateway';
import { RemoteSignService } from '../remote-sign.service';

describe('SockSignGateway', () => {
  let gateway: RemoteSignGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemoteSignGateway, RemoteSignService],
    }).compile();

    gateway = module.get<RemoteSignGateway>(RemoteSignGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});

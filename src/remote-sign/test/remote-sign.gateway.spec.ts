import { Test, TestingModule } from '@nestjs/testing';
import { RemoteSignGateway } from '../remote-sign.gateway';

describe('RemoteSignGateway', () => {
  let gateway: RemoteSignGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemoteSignGateway],
    }).compile();

    gateway = module.get<RemoteSignGateway>(RemoteSignGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});

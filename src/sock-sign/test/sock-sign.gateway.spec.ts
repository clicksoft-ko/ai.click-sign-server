import { Test, TestingModule } from '@nestjs/testing';
import { SockSignGateway } from '../sock-sign.gateway';
import { SockSignService } from '../sock-sign.service';

describe('SockSignGateway', () => {
  let gateway: SockSignGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SockSignGateway, SockSignService],
    }).compile();

    gateway = module.get<SockSignGateway>(SockSignGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});

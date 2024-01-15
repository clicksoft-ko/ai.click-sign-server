import { Module } from '@nestjs/common';
import { SockSignService } from './sock-sign.service';
import { SockSignGateway } from './sock-sign.gateway';

@Module({
  providers: [SockSignGateway, SockSignService],
})
export class SockSignModule {}

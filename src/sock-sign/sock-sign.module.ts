import { Module } from '@nestjs/common';
import { SockSignService } from './sock-sign.service';
import { SockSignGateway } from './sock-sign.gateway';
import { SocketRoomManager } from 'src/lib/socket-room-manager';

@Module({
  providers: [SockSignGateway, SockSignService, SocketRoomManager],
})
export class SockSignModule {}

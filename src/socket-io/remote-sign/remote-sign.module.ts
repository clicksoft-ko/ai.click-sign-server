import { Module } from '@nestjs/common';
import { RemoteSignService } from './remote-sign.service';
import { RemoteSignGateway } from './remote-sign.gateway';
import { SocketRoomManager } from 'src/lib/socket-room-manager';

@Module({
  providers: [RemoteSignGateway, RemoteSignService, SocketRoomManager],
})
export class RemoteSignModule {}

import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { RemoteSignService } from './remote-sign.service';
import { Server, Socket } from 'socket.io';
import { SockData } from './dto/sock-data';

@WebSocketGateway({ transports: ['websocket'] })
export class RemoteSignGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly sockSignService: RemoteSignService) {}
  afterInit(server: Server) {
    this.sockSignService.setServer(server);
  }

  @SubscribeMessage('roomIn')
  roomIn(@ConnectedSocket() socket: Socket, @MessageBody() room: string) {
    return this.sockSignService.roomIn(socket, room);
  }

  @SubscribeMessage('roomOut')
  roomOut(
    @ConnectedSocket() socket: Socket,
    @MessageBody('room') room: string
  ) {
    this.sockSignService.roomOut(socket, room);
  }

  @SubscribeMessage('fromWindow')
  async fromWindow(
    @ConnectedSocket() socket: Socket,
    @MessageBody() dto: SockData
  ) {
    return await this.sockSignService.fromWindow(socket, dto);
  }

  @SubscribeMessage('fromWeb')
  async fromWeb(
    @ConnectedSocket() socket: Socket,
    @MessageBody() dto: SockData
  ) {
    return await this.sockSignService.fromWeb(socket, dto);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`handleConnection : ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    this.sockSignService.disconnect(client);

    console.log(`handleDisconnect : ${client.id}`);
  }
}

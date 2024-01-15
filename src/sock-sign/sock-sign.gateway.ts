import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { SockSignService } from './sock-sign.service';
import { Server, Socket } from 'socket.io';
import { SockSignTransDto } from './dto/sock-sign-trans.dto';

@WebSocketGateway({ transports: ['websocket'] })
export class SockSignGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly sockSignService: SockSignService) {}
  @WebSocketServer()
  server: Server;
  client?: Socket;

  @SubscribeMessage('req-window')
  sockClient(@MessageBody() dto: SockSignTransDto) {
    console.log(dto);

    this.server.emit(`res-web-${dto.sockCode}`, dto);
  }

  @SubscribeMessage('req-web')
  sockMobile(@MessageBody() dto: SockSignTransDto) {
    this.server.emit(`res-window-${dto.sockCode}`, dto);
  }

  afterInit(server: Socket) {
    // throw new Error('Method not implemented.');
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.client = client;
    console.log(`handleConnection : ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    this.client = undefined;
    console.log(`handleDisconnect : ${client.id}`);
  }
}

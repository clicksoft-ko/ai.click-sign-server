import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { UseFilters, UseInterceptors } from '@nestjs/common';
import { HsService } from './hs.service';
import { Server, Socket } from 'socket.io';
import { HsEv } from './constants/hs-ev';
import { ClickDaemonDto } from '../../common/socket-io/dto/click-daemon.dto';
import { SocketIOExceptionsFilter } from '../../common/socket-io/filters/socket-io-exceptions.filter';
import { RoomEv } from '../../common/socket-io/constants/room-ev';
import { SocketIOInterceptor } from 'src/common/socket-io/interceptors/socket-io-interceptor';

@WebSocketGateway({ transports: ['websocket'], namespace: "/hs" })
@UseInterceptors(SocketIOInterceptor)
@UseFilters(SocketIOExceptionsFilter)
export class HsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly hsService: HsService) { }

  handleConnection(client: any, ...args: any[]) {
    this.hsService.connectChange(client, true);
  }

  handleDisconnect(client: any) {
    this.hsService.connectChange(client, false);
  }

  afterInit(server: Server) {
    this.hsService.setServer(server);
  }

  @SubscribeMessage(RoomEv.joinRoom)
  joinRoom(@MessageBody() dto: ClickDaemonDto, @ConnectedSocket() client: Socket) {
    return this.hsService.joinRoom(client, dto);
  }

  @SubscribeMessage(HsEv.getQuestionnaire)
  getQuestionnaire(@MessageBody() dto: ClickDaemonDto) {
    return this.hsService.brokerEvent(HsEv.getQuestionnaire, dto);
  }

  @SubscribeMessage(HsEv.saveQuestionnaire)
  saveQuestionnaire(@MessageBody() dto: ClickDaemonDto) {
    return this.hsService.brokerEvent(HsEv.saveQuestionnaire, dto);
  }

  @SubscribeMessage(HsEv.saveLifestyle)
  saveLifestyle(@MessageBody() dto: ClickDaemonDto) {
    return this.hsService.brokerEvent(HsEv.saveLifestyle, dto);
  }

  @SubscribeMessage(HsEv.getReceptionPatients)
  getReceptionPatients(@MessageBody() dto: ClickDaemonDto) {
    return this.hsService.brokerEvent(HsEv.getReceptionPatients, dto);
  }

  @SubscribeMessage(HsEv.getLifestyle)
  getLifestyle(@MessageBody() dto: ClickDaemonDto) {
    return this.hsService.brokerEvent(HsEv.getLifestyle, dto);
  }

  @SubscribeMessage(HsEv.saveCancer)
  saveCancer(@MessageBody() dto: ClickDaemonDto) {
    return this.hsService.brokerEvent(HsEv.saveCancer, dto);
  }

  @SubscribeMessage(HsEv.getCancer)
  getCancer(@MessageBody() dto: ClickDaemonDto) {
    return this.hsService.brokerEvent(HsEv.getCancer, dto);
  }
}

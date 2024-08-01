import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket } from '@nestjs/websockets';
import { ClickDeskService } from './click-desk.service';
import { ClickDeskEv } from './constants/click-desk-ev';
import { ClickDaemonDto } from '../../common/socket-io/dto/click-daemon.dto';
import { Server, Socket } from 'socket.io';
import { UseFilters, UseInterceptors } from '@nestjs/common';
import { SocketIOExceptionsFilter } from '../../common/socket-io/filters/socket-io-exceptions.filter';
import { SocketIOInterceptor } from 'src/common/socket-io/interceptors/socket-io-interceptor';
import { RoomEv } from 'src/common/socket-io/constants/room-ev';

@WebSocketGateway({ transports: ['websocket'], namespace: "/click-desk" })
@UseInterceptors(SocketIOInterceptor)
@UseFilters(SocketIOExceptionsFilter)
export class ClickDeskGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly clickDeskService: ClickDeskService) { }
  handleConnection(client: any, ...args: any[]) {
    this.clickDeskService.connectChange(client, true);
  }

  handleDisconnect(client: any) {
    this.clickDeskService.connectChange(client, false);
  }

  afterInit(server: Server) {
    this.clickDeskService.setServer(server);
  }

  @SubscribeMessage(RoomEv.joinRoom)
  joinRoom(@MessageBody() dto: ClickDaemonDto, @ConnectedSocket() client: Socket) {
    return this.clickDeskService.joinRoom(client, dto);
  }

  @SubscribeMessage(ClickDeskEv.getMobilePatientInfo)
  getMobilePatientInfo(@MessageBody() dto: ClickDaemonDto) {
    return this.clickDeskService.brokerEvent(ClickDeskEv.getMobilePatientInfo, dto);
  }

  @SubscribeMessage(ClickDeskEv.getMobileDoctorInfo)
  getMobileDoctorInfo(@MessageBody() dto: ClickDaemonDto) {
    return this.clickDeskService.brokerEvent(ClickDeskEv.getMobileDoctorInfo, dto);
  }

  @SubscribeMessage(ClickDeskEv.getMobilePatientCert)
  getMobilePatientCert(@MessageBody() dto: ClickDaemonDto) {
    return this.clickDeskService.brokerEvent(ClickDeskEv.getMobilePatientCert, dto);
  }

  @SubscribeMessage(ClickDeskEv.receiveMobilePatient)
  receiveMobilePatient(@MessageBody() dto: ClickDaemonDto) {
    return this.clickDeskService.brokerEvent(ClickDeskEv.receiveMobilePatient, dto);
  }

  @SubscribeMessage(ClickDeskEv.checkMobilePatientConsent)
  checkMobilePatientConsent(@MessageBody() dto: ClickDaemonDto) {
    return this.clickDeskService.brokerEvent(ClickDeskEv.checkMobilePatientConsent, dto);
  }

  @SubscribeMessage(ClickDeskEv.saveMobilePatientConsent)
  saveMobilePatientConsent(@MessageBody() dto: ClickDaemonDto) {
    return this.clickDeskService.brokerEvent(ClickDeskEv.saveMobilePatientConsent, dto);
  }

  @SubscribeMessage(ClickDeskEv.fetchHealthCheckUpList)
  fetchHealthCheckUpList(@MessageBody() dto: ClickDaemonDto) {
    return this.clickDeskService.brokerEvent(ClickDeskEv.fetchHealthCheckUpList, dto);
  }
}

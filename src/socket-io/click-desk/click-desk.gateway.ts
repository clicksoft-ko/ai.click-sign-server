import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket } from '@nestjs/websockets';
import { ClickDeskService } from './click-desk.service';
import { ClickDeskEv } from './constants/click-desk-ev';
import { ClickDaemonDto } from './dto/click-daemon.dto';
import { Server, Socket } from 'socket.io';
import { UseFilters } from '@nestjs/common';
import { SocketIOExceptionsFilter } from '../filters/socket-io-exceptions.filter';

@WebSocketGateway({ transports: ['websocket'], namespace: "/click-desk" })
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

  @SubscribeMessage(ClickDeskEv.joinRoom)
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
}

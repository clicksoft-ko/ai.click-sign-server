import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket } from '@nestjs/websockets';
import { ClickDeskService } from './click-desk.service';
import { ClickDeskConst } from './constants/click-desk-const';
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

  @SubscribeMessage(ClickDeskConst.joinRoom)
  joinRoom(@MessageBody() dto: ClickDaemonDto, @ConnectedSocket() client: Socket) {
    return this.clickDeskService.joinRoom(client, dto);
  }

  @SubscribeMessage(ClickDeskConst.getMobilePatientInfo)
  getMobilePatientInfo(@MessageBody() dto: ClickDaemonDto) {
    return this.clickDeskService.brokerEvent(ClickDeskConst.getMobilePatientInfo, dto);
  }

  @SubscribeMessage(ClickDeskConst.getMobileDoctorInfo)
  getMobileDoctorInfo(@MessageBody() dto: ClickDaemonDto) {
    return this.clickDeskService.brokerEvent(ClickDeskConst.getMobileDoctorInfo, dto);
  }

  @SubscribeMessage(ClickDeskConst.getMobilePatientCert)
  getMobilePatientCert(@MessageBody() dto: ClickDaemonDto) {
    return this.clickDeskService.brokerEvent(ClickDeskConst.getMobilePatientCert, dto);
  }

  @SubscribeMessage(ClickDeskConst.receiveMobilePatient)
  receiveMobilePatient(@MessageBody() dto: ClickDaemonDto) {
    return this.clickDeskService.brokerEvent(ClickDeskConst.receiveMobilePatient, dto);
  }

  @SubscribeMessage(ClickDeskConst.checkMobilePatientConsent)
  checkMobilePatientConsent(@MessageBody() dto: ClickDaemonDto) {
    return this.clickDeskService.brokerEvent(ClickDeskConst.checkMobilePatientConsent, dto);
  }

  @SubscribeMessage(ClickDeskConst.saveMobilePatientConsent)
  saveMobilePatientConsent(@MessageBody() dto: ClickDaemonDto) {
    return this.clickDeskService.brokerEvent(ClickDeskConst.saveMobilePatientConsent, dto);
  }
}

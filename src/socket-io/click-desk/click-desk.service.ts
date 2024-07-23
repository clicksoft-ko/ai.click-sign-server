import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { LoggerService } from 'src/logger/logger.service';
import { ClickDaemonDto } from './dto/click-daemon.dto';
import { SocketEvError } from 'src/models/socket-ev-error';
import { SocketResponse } from './dto/socket-response';
import { ClickDeskEv } from './constants/click-desk-ev';

@Injectable()
export class ClickDeskService {
  constructor(private readonly logger: LoggerService) {
    logger.setContext('ClickDeskService');
  }

  private server: Server;

  setServer(server: Server) {
    this.server = server;
  }

  async connectChange(client: Socket, connected: boolean) {
    this.logger.log(connected ? `소켓연결됨` : "연결해제") + `: ${client.id}`
  }

  async brokerEvent(ev: string, dto: ClickDaemonDto): Promise<SocketResponse<any>> {
    const result = await this.server
      .to(dto.key)
      .timeout(10000)
      .emitWithAck(ev, dto);

    const resultData = this.getResult(result);
    if (resultData?.status === 'error') {
      throw new SocketEvError({ ...resultData }, ev)
    }

    return { status: 'success', data: resultData };
  }

  private getResult(result: any) {
    const resultData = result?.[0];
    if (!resultData) {
      throw new Error("클라이언트로부터 요청을 실패했어요.")
    }

    return resultData;
  }

  async joinRoom(client: Socket, dto: ClickDaemonDto): Promise<SocketResponse<any>> {
    const rooms = Array.from(client.rooms).slice(1);
    const existRoom = rooms.some(room => room === dto.key)
    const anotherRooms = rooms.filter(room => room != dto.key)

    // 클라이언트가 방이 변경된 경우 이전 방은 나간다.
    anotherRooms?.forEach(room => {
      this.server.to(room).emit(ClickDeskEv.leaveRoom, { room })
      client.leave(room)
    });

    // 클라이언트가 방이 없는 경우 방에 들어간다.
    const emitData = { room: dto.key }
    const isValidKey = !!dto.key;

    if (!existRoom && isValidKey) {
      this.server.to(dto.key).emit(ClickDeskEv.leaveRoom, emitData); // 다른 클라이언트에 해당 방이 존재하면 나간다고 알림.
      this.server.socketsLeave(dto.key); // 다른 클라이언트에 해당 방이 존재하면 나간다.
      client.join(dto.key);
    }

    return {
      status: existRoom
        ? "none"
        : isValidKey ? 'success' : 'error',
      data: { room: dto.key }
    }
  }
}

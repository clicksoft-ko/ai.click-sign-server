import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SocketRoomManager } from 'src/lib/socket-room-manager';
import { SockData } from './dto/sock-data';

@Injectable()
export class SockSignService {
  private server: Server;
  constructor(private readonly roomManager: SocketRoomManager) {}

  setServer(server: Server) {
    this.server = server;
    this.roomManager.setServer(server);
  }

  roomIn(socket: Socket, room: string) {
    this.roomManager.leaveAllClientsInRoom(room);
    // if (isRoomExists) {
    //   return {
    //     status: 'error',
    //     errorMessage: '해당 코드는 이미 사용중입니다.',
    //   };
    // }
    socket.join(room);
    return {
      status: 'join',
    };
  }

  roomOut(socket: Socket, room: string) {
    socket.leave(room);
  }

  async fromWindow(socket: Socket, data: SockData) {
    try {
      const response = await this.server
        .to(data.room)
        .timeout(10000)
        .emitWithAck('toWeb', data);

      console.log('fromWindow res', response);
      return response?.length > 0;
    } catch {
      return false;
    }
  }

  async fromWeb(socket: Socket, data: SockData) {
    try {
      const response = await this.server
        .to(data.room)
        .timeout(10000)
        .emitWithAck('toWindow', data);
      console.log('fromWeb res', response);
      return response?.length > 0;
    } catch {
      return false;
    }
  }

  disconnect(socket: Socket) {
    // this.roomManager.leaveAll(socket);
  }
}

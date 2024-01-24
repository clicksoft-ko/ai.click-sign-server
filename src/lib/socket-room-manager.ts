import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@Injectable()
export class SocketRoomManager {
  private server: Server;

  setServer(server: Server) {
    this.server = server;
  }

  isRoomExists(room: string): boolean {
    for (const key of this.server.sockets.adapter.rooms.keys()) {
      if (key === room) return true;
    }
    return false;
  }
}

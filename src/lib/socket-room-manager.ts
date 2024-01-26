import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class SocketRoomManager {
  private server: Server;

  setServer(server: Server) {
    this.server = server;
  }

  isRoomExists(room: string): boolean {
    const rooms = this.server.sockets.adapter.rooms.get(room);
    return rooms.size > 0;
  }

  leaveAllClientsInRoom(room: string) {
    const clientsInRoom = Array.from(
      this.server.sockets.adapter.rooms.get(room) || []
    );

    // 모든 클라이언트를 룸에서 leave 시킵니다.
    clientsInRoom.forEach((clientId) => {
      const socket = this.server.sockets.sockets.get(clientId);
      if (socket) {
        socket.leave(room);
      }
    });

    return clientsInRoom;
  }
}

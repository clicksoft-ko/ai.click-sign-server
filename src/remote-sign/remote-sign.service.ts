import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SockData, ToWindow } from './dto/sock-data';

@Injectable()
export class RemoteSignService {
  async fromWindow(
    server: Server,
    client: Socket,
    data: SockData,
    ackCallback: any
  ) {
    try {
      server.emit(`toWeb-${data.sockCode}`, data);
    } catch (error) {
      console.log('fromWindow', `에러발생`, error.message);
      client.emit(`toWindowError-${data.sockCode}`, {
        sockCode: data.sockCode,
        toWindow: ToWindow.웹접속에러,
      } as SockData);
    }
  }

  fromWeb(server: Server, data: SockData, ackCallback: any) {
    // console.log('fromWeb', data);
    server.emit(`toWindow-${data.sockCode}`, data);
  }
}

import { INestApplication } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { RemoteSignService } from './remote-sign.service';

export class RemoteSignGateway {
  private service: RemoteSignService;
  constructor(private app: INestApplication) {
    const httpServer = app.getHttpServer();
    const server = new Server(httpServer);
    this.service = this.app.get(RemoteSignService);

    server.on('connection', this.onConnection.bind(this, server));
  }

  onConnection(server: Server, client: Socket) {
    console.log(`connected - ${client.id}`);
    client.on('disconnect', () => {
      console.log('disconnect', client.id);
    });
    client.on(
      'fromWindow',
      this.service.fromWindow.bind(this.service, server, client)
    );
    client.on('fromWeb', this.service?.fromWeb.bind(this, server));
  }
}

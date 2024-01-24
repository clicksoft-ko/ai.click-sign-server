import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SockSignModule } from './sock-sign/sock-sign.module';
import { SocketServer } from './lib/socket-io';
import { RemoteSignService } from './remote-sign/remote-sign.service';

@Module({
  imports: [SockSignModule],
  controllers: [AppController],
  providers: [AppService, SocketServer, RemoteSignService],
})
export class AppModule {}

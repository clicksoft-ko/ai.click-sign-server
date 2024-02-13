import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RemoteSignModule } from './remote-sign/remote-sign.module';
import { SocketServer } from './lib/socket-io';

@Module({
  imports: [RemoteSignModule],
  controllers: [AppController],
  providers: [AppService, SocketServer],
})
export class AppModule {}

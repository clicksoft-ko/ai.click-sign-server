import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RemoteSignModule } from './socket-io/remote-sign/remote-sign.module';
import { SocketServer } from './lib/socket-io';
import { ClickDeskModule } from './socket-io/click-desk/click-desk.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [RemoteSignModule, ClickDeskModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService, SocketServer,],
})
export class AppModule { }

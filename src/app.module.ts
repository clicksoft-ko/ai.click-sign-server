import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketServer } from './common/socket-io/lib/socket-io';
import { LoggerModule } from './logger/logger.module';
import { MetricsModule } from './modules/metrics/metrics.module';
import { ClickDeskModule } from './socket-io/click-desk/click-desk.module';
import { HsModule } from './socket-io/hs/hs.module';
import { RemoteSignModule } from './socket-io/remote-sign/remote-sign.module';
import { WebAppModule } from './socket-io/web-app/web-app.module';

@Module({
  imports: [RemoteSignModule, ClickDeskModule, LoggerModule, HsModule, WebAppModule, MetricsModule],
  controllers: [AppController],
  providers: [AppService, SocketServer],
})
export class AppModule { }

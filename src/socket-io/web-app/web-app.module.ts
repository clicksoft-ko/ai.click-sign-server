import { Module } from '@nestjs/common';
import { WebAppService } from './web-app.service';
import { WebAppGateway } from './web-app.gateway';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [WebAppGateway, WebAppService],
})
export class WebAppModule {}

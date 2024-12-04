import { Module } from '@nestjs/common';
import { WebAppService } from './web-app.service';
import { WebAppGateway } from './web-app.gateway';
import { LoggerModule } from 'src/logger/logger.module';
import { MetricsModule } from 'src/modules/metrics/metrics.module';

@Module({
  imports: [LoggerModule, MetricsModule],
  providers: [WebAppGateway, WebAppService],
})
export class WebAppModule {}

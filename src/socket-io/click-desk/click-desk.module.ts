import { Module } from '@nestjs/common';
import { ClickDeskService } from './click-desk.service';
import { ClickDeskGateway } from './click-desk.gateway';
import { LoggerModule } from 'src/logger/logger.module';
import { MetricsModule } from 'src/modules/metrics/metrics.module';

@Module({
  imports: [LoggerModule, MetricsModule],
  providers: [ClickDeskGateway, ClickDeskService],
})
export class ClickDeskModule { }

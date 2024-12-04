import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { HsGateway } from './hs.gateway';
import { HsService } from './hs.service';
import { MetricsModule } from 'src/modules/metrics/metrics.module';

@Module({
  imports: [LoggerModule, MetricsModule],
  providers: [HsGateway, HsService],
})

export class HsModule { }

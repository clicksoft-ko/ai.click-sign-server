import { Module } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { MetricsService } from './metrics.service';

@Module({
  imports: [PrometheusModule.register({
    defaultMetrics: {
      enabled: true,
    },
    path: '/metrics',
  })],
  providers: [MetricsService],
  exports: [PrometheusModule, MetricsService],

})
export class MetricsModule { }

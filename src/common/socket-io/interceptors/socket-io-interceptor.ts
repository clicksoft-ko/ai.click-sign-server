import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from 'src/logger/logger.service';
import { MetricsService } from 'src/modules/metrics/metrics.service';
import { getSocketIp } from 'src/shared/utils/ip.util';

@Injectable()
export class SocketIOInterceptor implements NestInterceptor {
  constructor(
    private readonly logger: LoggerService,
    private readonly metricsService: MetricsService
  ) {
    logger.setContext(SocketIOInterceptor.name);
  };

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    const handler = context.getHandler();
    const args = context.getArgs();
    const roomKey = args?.[1]?.key;
    const ip = getSocketIp(request);

    this.metricsService.logIpRoomKeyHandler(ip, roomKey, handler.name);
    console.log(`[Handling] room: ${roomKey}, ev: ${handler.name} ... ip: ${ip}`);

    return next
      .handle()
      .pipe(
        tap(() => console.log(`[Finished] room: ${roomKey}, ev: ${handler.name} after ${Date.now() - now}ms`)),
      );
  }
}
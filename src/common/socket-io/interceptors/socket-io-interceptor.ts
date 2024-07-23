import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class SocketIOInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {
    logger.setContext(SocketIOInterceptor.name);
  };

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const handler = context.getHandler();
    const args = context.getArgs();
    const roomKey = args?.[1]?.key;
    console.log(`[Handling] room: ${roomKey}, ev: ${handler.name} ...`);

    return next
      .handle()
      .pipe(
        tap(() => console.log(`[Finished] room: ${roomKey}, ev: ${handler.name} after ${Date.now() - now}ms`)),
      );
  }
}
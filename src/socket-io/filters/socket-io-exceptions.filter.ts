import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { LoggerService } from 'src/logger/logger.service';
import { SocketResponse } from '../click-desk/dto/socket-response';

@Catch()
export class SocketIOExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {
    logger.setContext(SocketIOExceptionsFilter.name);
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToWs();
    // const client = ctx.getClient<Socket>();
    // const data = ctx.getData();
    // const callback = ctx.getPattern();

    this.logger.error(exception);
    if ('args' in ctx && Array.isArray(ctx.args) && typeof ctx.args?.[2] === 'function') {
      ctx.args[2]({ ...(exception as any).error, status: "error" } satisfies SocketResponse<any>);
      return;
    }
  }
}
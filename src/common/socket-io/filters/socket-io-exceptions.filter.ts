import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';
import { SocketResponse } from '../dto/socket-response';
import { SocketEvError } from '../models/socket-ev-error';

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
      let dto = { message: "클라이언트 통신 간 오류가 발생했습니다." };
      if (exception instanceof SocketEvError)
        dto = exception.error;
      else if (exception instanceof Error)
        dto = { message: `${dto.message}\n\n${exception?.message}` };
      else
        dto = { message: `클라이언트 통신 간 알 수 없는 오류가 발생했습니다.` };

      ctx.args[2]({ ...dto, status: "error" } satisfies SocketResponse<any>);
      return;
    }
  }
}
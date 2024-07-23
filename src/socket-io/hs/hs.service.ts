import { Injectable } from '@nestjs/common';
import { SocketServiceBase } from 'src/common/socket-io/lib/socket-service-base';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class HsService extends SocketServiceBase {
  constructor(logger: LoggerService) {
    logger.setContext(HsService.name);
    super(logger);
  }
}

import { Injectable, Logger, LogLevel, LoggerService as NestLoggerSerivce } from '@nestjs/common';

@Injectable()
export class LoggerService implements NestLoggerSerivce {
  private logger: Logger;

  setContext(context: string) {
    this.logger = new Logger(context);
  }

  log(message: any, ...optionalParams: any[]) {
    this.logger.log(message);
  }
  error(message: any, ...optionalParams: any[]) {
    this.logger.error(message);
  }
  warn(message: any, ...optionalParams: any[]) {
    this.logger.warn(message);
  }
  debug?(message: any, ...optionalParams: any[]) {
    this.logger.debug(message);
  }
  verbose?(message: any, ...optionalParams: any[]) {
    this.logger.verbose(message);
  }
  fatal?(message: any, ...optionalParams: any[]) {
    this.logger.fatal(message);
  }

  setLogLevels?(levels: LogLevel[]) { }
}

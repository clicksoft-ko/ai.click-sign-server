import { Module } from '@nestjs/common';
import { ClickDeskService } from './click-desk.service';
import { ClickDeskGateway } from './click-desk.gateway';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [ClickDeskGateway, ClickDeskService, LoggerModule],
})
export class ClickDeskModule { }

import { Module } from '@nestjs/common';
import { ClickDeskService } from './click-desk.service';
import { ClickDeskGateway } from './click-desk.gateway';
import { LoggerModule } from 'src/logger/logger.module';
import { LoggerService } from 'src/logger/logger.service';

@Module({  
  providers: [ClickDeskGateway, ClickDeskService, LoggerService],  
})
export class ClickDeskModule { }

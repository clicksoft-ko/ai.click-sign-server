import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { HsGateway } from './hs.gateway';
import { HsService } from './hs.service';

@Module({
  imports: [LoggerModule],
  providers: [HsGateway, HsService],
})

export class HsModule { }

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SockSignModule } from './sock-sign/sock-sign.module';

@Module({
  imports: [SockSignModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

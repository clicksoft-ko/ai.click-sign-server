import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
  });

  app.enableCors({
    origin: ['*'],
  });

  await app.listen(4001, ()=> {
    console.log(`4001포트 연결 됨`);    
  });
}

bootstrap();

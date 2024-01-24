import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RemoteSignGateway } from './remote-sign/remote-sign.gateway';
import { Server } from 'socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [],
  });

  // new RemoteSignGateway(app);

  await app.listen(4001);
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'auth',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'auth-group',
      },
    },
  });
  await app.listen().then(() => {
    Logger.log('[SERVER] - AUTH KAFKA SERVER LISTENING');
  });
}
bootstrap();

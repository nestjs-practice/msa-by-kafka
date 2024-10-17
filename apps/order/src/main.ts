import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';

async function bootstrap() {
  const app = await NestFactory.create(OrderModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

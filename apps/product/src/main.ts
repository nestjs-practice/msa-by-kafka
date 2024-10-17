import { NestFactory } from '@nestjs/core';
import { ProductModule } from './product.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

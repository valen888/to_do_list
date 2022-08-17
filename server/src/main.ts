import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const port = config.get<string>(ConfigConstants.port) || 5000;
  const port = 3000;

  app.enableCors();

  await app.listen(port, () => console.log(`Server started on PORT: ${port}`));
}
bootstrap();

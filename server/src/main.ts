import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigConstants } from './common/constants/config.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  const port = config.get<string>(ConfigConstants.port) || 3000;

  app.enableCors();

  await app.listen(port, () => console.log(`Server started on PORT: ${port}`));
}
bootstrap();

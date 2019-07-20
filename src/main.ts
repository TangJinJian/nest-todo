import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { cors } from './common/middleware/cors.middleware';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors);
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();

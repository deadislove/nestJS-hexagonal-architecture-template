import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from '@shared/interceptors/response.interceptor';
import { GlobalHttpExceptionFilter } from '@shared/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ResponseInterceptor())
  app.useGlobalFilters(new GlobalHttpExceptionFilter())

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

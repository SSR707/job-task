import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const api = 'api/v1';
  const swaggerApi = 'api/docs';
  app.setGlobalPrefix(api);
  const config_swagger = new DocumentBuilder()
    .setTitle('TASK')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'Bearer',
      in: 'Header',
    })
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, config_swagger);
  SwaggerModule.setup(swaggerApi, app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

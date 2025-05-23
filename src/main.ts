import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Global prefix
  // app.setGlobalPrefix('api');
  
  // Enable CORS
  app.enableCors();
  

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('API Shipping Goods')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // Importar

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = new DocumentBuilder()
    .setTitle('Mi API con NestJS')
    .setDescription('Descripción de la API para mi proyecto')
    .setVersion('1.0')

    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000/',
    methods: '*',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

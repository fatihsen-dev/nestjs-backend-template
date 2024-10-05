import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { ENV } from './common/config';
import { HttpExceptionFilter } from './common/filters/http-exeception.filter';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.setGlobalPrefix(ENV.PREFIX);

    app.useGlobalPipes(
        new ValidationPipe({ whitelist: true, transform: true }),
    );

    app.useGlobalFilters(new HttpExceptionFilter(), {
        catch: new HttpExceptionFilter().catch,
    });

    app.enableCors({
        origin: ['*://localhost:*/*'],
        credentials: true,
    });

    app.use(cookieParser());

    const config = new DocumentBuilder()
        .setTitle('NestJs Backend Template')
        .setDescription('')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('', app, document);

    await app.listen(ENV.HTTP_PORT);
}
bootstrap();

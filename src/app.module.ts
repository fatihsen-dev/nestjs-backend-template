import { HttpExceptionFilter } from '@/common/filters/http-exeception.filter';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { AuthMiddleware } from '@/common/middleware/auth.middleware';
import { CacheModule } from '@nestjs/cache-manager';
import { MiddlewareConsumer, Module, NestModule, Scope } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogService } from './common/services/log.service';
import { RequestService } from './common/services/request.service';
import { AuthModule } from './modules/auth/auth.module';

const modules = [AuthModule];

@Module({
    imports: [
        CacheModule.register({
            isGlobal: true,
        }),
        JwtModule.register({
            global: true,
        }),
        ...modules,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        RequestService,
        LogService,
        {
            provide: APP_INTERCEPTOR,
            scope: Scope.REQUEST,
            useClass: LoggingInterceptor,
        },
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes('*');
    }
}

import { HttpExceptionFilter } from '@/common/filters/http-exeception.filter';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { CacheModule } from '@nestjs/cache-manager';
import { Module, Scope } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.module';
import { AuthnGuard } from './common/guards/authn.guard';
import { LogService } from './common/services/log.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

const modules = [AuthModule, UsersModule];

@Module({
    imports: [
        CacheModule.register({
            isGlobal: true,
        }),
        JwtModule.register({
            global: true,
        }),
        ...modules,
        DatabaseModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
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
        {
            provide: APP_GUARD,
            useClass: AuthnGuard,
        },
    ],
})
export class AppModule {}

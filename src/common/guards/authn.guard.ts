import { User } from '@/modules/users/entities/user.entity';
import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ENV } from '../config';

@Injectable()
export class AuthnGuard implements CanActivate {
    @Inject(Reflector) reflector: Reflector;
    @Inject(JwtService) jwtService: JwtService;

    async canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) return true;

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokensFromCookie(request);

        if (!token) {
            throw new UnauthorizedException('Invalid token');
        }

        try {
            const user = await this.jwtService.verifyAsync<User>(token, {
                secret: ENV.JWT_REFRESH_SECRET_KEY,
            });

            request.user = user;

            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }

    private extractTokensFromCookie(request: Request): string {
        const token = request.headers.authorization?.split(' ')[1];

        if (!token && !token?.length) {
            throw new UnauthorizedException();
        }

        return token;
    }
}

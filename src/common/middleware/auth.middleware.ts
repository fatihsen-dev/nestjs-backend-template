import { RequestService } from '@/common/services/request.service';
import {
    Inject,
    Injectable,
    NestMiddleware,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { ENV } from '../config';
import { RequestUser } from '../types/request-user';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    @Inject(JwtService) jwtService: JwtService;
    @Inject(RequestService) requestService: RequestService;

    async use(req: Request, res: Response, next: NextFunction) {
        const token = this.extractToken(req);

        if (token) {
            try {
                const user = await this.jwtService.verifyAsync<RequestUser>(
                    token,
                    {
                        secret: ENV.JWT_ACCESS_SECRET_KEY,
                    },
                );

                this.requestService.setAuthUser(user);
            } catch (error) {
                throw new UnauthorizedException('Invalid token');
            }
        }

        return next();
    }

    private extractToken(request: Request) {
        const token = request.headers.authorization?.split(' ')[1];

        if (!token) {
            return null;
        }

        return token;
    }
}

import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequestService } from '../services/request.service';

@Injectable()
export class AuthnGuard implements CanActivate {
    @Inject(RequestService) requestService: RequestService;
    @Inject(Reflector) reflector: Reflector;

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) return true;

        const user = this.requestService.getAuthUser();

        if (!user) {
            throw new UnauthorizedException();
        }

        return true;
    }
}

import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '../types/user-role';

@Injectable()
export class AuthzGuard implements CanActivate {
    @Inject(Reflector) reflector: Reflector;

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!roles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        return roles.some((role) => user.role === role);
    }
}

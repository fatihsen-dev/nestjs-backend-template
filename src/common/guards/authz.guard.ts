import { CanActivate, ExecutionContext, mixin } from '@nestjs/common';
import { UserRole } from '../types/user-role';

export const AuthzGuard = (roles: UserRole[]) => {
    class AuthzGuard implements CanActivate {
        async canActivate(context: ExecutionContext) {
            const request = context.switchToHttp().getRequest();
            const { role } = request.user;

            if (!roles) {
                return true;
            }

            return roles.some((r) => r === role);
        }
    }
    return mixin(AuthzGuard);
};

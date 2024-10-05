import { Injectable, Scope } from '@nestjs/common';
import { RequestUser } from '../types/request-user';

@Injectable({ scope: Scope.REQUEST })
export class RequestService {
    private user: RequestUser | null = null;

    setAuthUser(user: RequestUser | null) {
        this.user = user;
    }

    getAuthUser() {
        return this.user;
    }
}

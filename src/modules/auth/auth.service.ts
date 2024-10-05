import { RequestService } from '@/common/services/request.service';
import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    @Inject(RequestService) requestService: RequestService;

    register(registerDto: RegisterDto) {
        return registerDto;
    }

    login(loginDto: LoginDto) {
        return loginDto;
    }

    AuthUser() {
        return this.requestService.getAuthUser();
    }
}

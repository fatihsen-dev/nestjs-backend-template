import { IsPublic } from '@/common/decorators/public.decorator';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    @Inject(AuthService) authService: AuthService;

    @IsPublic()
    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @IsPublic()
    @Post('login')
    lofin(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Get('auth-user')
    authUser() {
        return this.authService.AuthUser();
    }
}

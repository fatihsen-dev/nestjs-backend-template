import { IsPublic } from '@/common/decorators/public.decorator';
import { GetUser } from '@/common/decorators/user.decorator';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateDto } from '../users/dto/create.dto';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    @Inject(AuthService) authService: AuthService;

    @IsPublic()
    @Post('register')
    register(@Body() createDto: CreateDto) {
        return this.authService.register(createDto);
    }

    @IsPublic()
    @Post('login')
    lofin(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Get('auth-user')
    authUser(@GetUser() user: User) {
        return this.authService.AuthUser(user);
    }
}

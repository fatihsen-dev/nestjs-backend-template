import { generateAuthTokens } from '@/common/libs/generate-token';
import {
    Inject,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { CreateDto } from '../users/dto/create.dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from './../users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    @Inject(UsersService) usersService: UsersService;
    @Inject(JwtService) jwtService: JwtService;

    async register(createDto: CreateDto) {
        const user = await this.usersService.create(createDto);
        delete user.password;
        delete user.deleted_at;
        return user;
    }

    async login(loginDto: LoginDto) {
        const user = await this.usersService.findByUsername(loginDto.username);

        if (!user) {
            throw new NotFoundException('Kullanıcı bulunamdı');
        }

        if (!(await compare(loginDto.password, user.password))) {
            throw new UnauthorizedException('Kullanıcı adı veya şifre hatalı');
        }

        delete user?.password;
        delete user?.deleted_at;

        const { refresh_token } = await generateAuthTokens(
            user,
            this.jwtService,
        );

        return {
            token: refresh_token,
            user,
        };
    }

    async AuthUser(u: User) {
        const user = await this.usersService.findById(u.id);
        delete user.password;
        delete user.deleted_at;
        return user;
    }
}

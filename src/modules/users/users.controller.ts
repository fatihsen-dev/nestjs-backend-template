import { IdParamDto } from '@/common/dto/id-param.dto';
import { AuthzGuard } from '@/common/guards/authz.guard';
import { UserRole } from '@/common/types/user-role';
import {
    Controller,
    Get,
    Inject,
    NotFoundException,
    Param,
    UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('Auth')
@Controller('users')
export class UsersController {
    @Inject(UsersService) usersService: UsersService;

    @Get()
    @UseGuards(AuthzGuard([UserRole.ADMIN]))
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    async findOneById(@Param() { id }: IdParamDto) {
        const user = await this.usersService.findById(id);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        delete user?.password;
        delete user?.deleted_at;

        return user;
    }
}

import { DatabaseModule } from '@/common/database/database.module';
import { Module } from '@nestjs/common';
import { userProviders } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [DatabaseModule],
    controllers: [UsersController],
    providers: [UsersService, ...userProviders],
    exports: [UsersService, ...userProviders],
})
export class UsersModule {}

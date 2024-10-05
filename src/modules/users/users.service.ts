import {
    ConflictException,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { hash } from 'bcrypt';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    @Inject('USER_REPOSITORY') userRepository: Repository<User>;

    async create(user: CreateDto) {
        try {
            return await this.userRepository.save({
                ...user,
                password: await hash(user.password, 12),
            });
        } catch (error) {
            throw new ConflictException(
                'Kullanıcı adı başka biri tarafından kullanılıyor',
            );
        }
    }

    findAll() {
        return this.userRepository.find({
            select: {
                id: true,
                name: true,
                username: true,
                role: true,
                created_at: true,
            },
        });
    }

    findByUsername(username: string) {
        return this.findOne({ username });
    }

    findById(id: number) {
        return this.findOne({ id });
    }

    async findOne(where: FindOptionsWhere<User> | FindOptionsWhere<User>[]) {
        return await this.userRepository.findOne({
            where,
        });
    }

    async update(id: number, updateDto: UpdateDto) {
        const user = await this.findById(id);

        if (!user) {
            throw new NotFoundException('Kullanıcı bulunamdı');
        }

        try {
            return this.userRepository.update(
                {
                    id,
                },
                updateDto,
            );
        } catch (error) {
            throw new ConflictException(
                'Kullanıcı adı başka biri tarafından kullanılıyor',
            );
        }
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}

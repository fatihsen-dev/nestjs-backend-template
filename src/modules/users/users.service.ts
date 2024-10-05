import { Injectable } from '@nestjs/common';
import { UpdateDto } from './dto/update.dto';

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    password: string;
}

@Injectable()
export class UsersService {
    private users: User[] = [];

    create(user: User) {
        return this.users.push(user);
    }

    findAll() {
        return `This action returns all users`;
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(id: number, updateDto: UpdateDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}

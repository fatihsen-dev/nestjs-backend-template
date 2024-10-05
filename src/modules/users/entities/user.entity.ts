import { UserRole } from '@/common/types/user-role';
import {
    Column,
    CreateDateColumn,
    DataSource,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ unique: true, type: 'varchar' })
    username: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole;

    @UpdateDateColumn()
    updated_at?: string;

    @CreateDateColumn()
    created_at?: string;

    @DeleteDateColumn({ default: null, select: false })
    deleted_at?: string;
}

export const userProviders = [
    {
        provide: 'USER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
        inject: ['DATA_SOURCE'],
    },
];

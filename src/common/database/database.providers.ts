import { User } from '@/modules/users/entities/user.entity';
import { DataSource } from 'typeorm';
import { ENV } from '../config';

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'mysql',
                host: ENV.DB_HOST,
                port: ENV.DB_PORT,
                username: ENV.DB_USERNAME,
                password: ENV.DB_PASSWORD,
                database: ENV.DB_DATABASE,
                entities: [User],
                synchronize: true,
                charset: 'utf8_general_ci',
            });

            return dataSource.initialize();
        },
    },
];

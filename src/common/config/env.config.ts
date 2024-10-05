import 'dotenv/config';
import { cleanEnv, num, str } from 'envalid';

export const ENV = cleanEnv(process.env, {
    HTTP_PORT: num({ default: 5000 }),
    PREFIX: str({ default: 'v1' }),
    JWT_ACCESS_SECRET_KEY: str(),
    JWT_REFRESH_SECRET_KEY: str(),
    DC_WEBHOOK_URL: str({ default: null }),
});

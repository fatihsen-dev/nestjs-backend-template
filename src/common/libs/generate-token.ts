import { User } from '@/modules/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ENV } from '../config';

export const generateAuthTokens = async (
    user: User,
    jwtService: JwtService,
) => {
    const access_token = await jwtService.signAsync(
        { id: user.id, username: user.username, role: user.role },
        {
            expiresIn: '1h',
            secret: ENV.JWT_ACCESS_SECRET_KEY,
        },
    );
    const refresh_token = await jwtService.signAsync(
        { id: user.id, username: user.username, role: user.role },
        {
            expiresIn: '7d',
            secret: ENV.JWT_REFRESH_SECRET_KEY,
        },
    );

    return { access_token, refresh_token };
};

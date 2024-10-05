import { IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
    @IsString()
    @MinLength(3)
    @MaxLength(40)
    username: string;

    @IsString()
    @MinLength(6)
    @MaxLength(60)
    password: string;
}

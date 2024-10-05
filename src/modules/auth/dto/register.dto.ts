import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(10)
    @MaxLength(15)
    phone: string;

    @IsString()
    @MinLength(6)
    @MaxLength(80)
    password: string;
}

import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateDto {
    @IsString()
    @MinLength(3)
    @MaxLength(40)
    name: string;

    @IsString()
    @MinLength(3)
    @MaxLength(40)
    username: string;

    @IsString()
    @MinLength(6)
    @MaxLength(60)
    @Matches(/^\S*$/, {
        message: 'password too weak',
    })
    password: string;
}

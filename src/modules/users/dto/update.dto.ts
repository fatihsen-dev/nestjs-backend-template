import {
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export class UpdateDto {
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(40)
    name?: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(40)
    username?: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    @MaxLength(60)
    @Matches(/^\S*$/, {
        message: 'password too weak',
    })
    password?: string;
}

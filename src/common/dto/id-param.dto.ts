import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class IdParamDto {
    @IsNumber(
        {},
        {
            message: 'id parametresi bir sayı olmalıdır',
        },
    )
    @Transform(({ obj }) => {
        return +obj.id;
    })
    id: number;
}

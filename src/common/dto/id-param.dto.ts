import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class IdParamDto {
    @IsNumber(
        {},
        {
            message: 'id parameter must be a number',
        },
    )
    @Transform(({ obj }) => {
        return +obj.id;
    })
    id: number;
}

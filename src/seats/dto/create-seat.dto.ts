import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsPositive,
  isNumber,
} from 'class-validator';

export class CreateSeatDto {
  @IsInt()
  @IsPositive()
  idRoom: number;

  @IsNumber()
  row: number;

  @IsNumber()
  number: number;
  @IsBoolean()
  enabled: boolean;
}

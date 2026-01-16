import { IsInt, IsPositive, IsNumber } from 'class-validator';

export class CreateScheduleDto {
  @IsInt()
  @IsPositive()
  idMovie: number;
  @IsInt()
  @IsPositive()
  idRoom: number;

  @IsNumber()
  price: number;
}

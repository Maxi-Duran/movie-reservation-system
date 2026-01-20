import { IsInt, IsPositive, IsNumber, IsDate } from 'class-validator';

export class CreateScheduleDto {
  @IsInt()
  @IsPositive()
  idMovie: number;
  @IsInt()
  @IsPositive()
  idRoom: number;
  @IsDate()
  DateTime: Date;
  @IsNumber()
  price: number;
}

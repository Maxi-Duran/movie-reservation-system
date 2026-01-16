import { IsInt, IsPositive } from 'class-validator';

export class CreateReservationDto {
  @IsInt()
  @IsPositive()
  idUser: number;
  @IsInt()
  @IsPositive()
  idSchedules: number;
}

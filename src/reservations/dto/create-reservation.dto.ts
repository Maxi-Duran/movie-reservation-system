import { isInt, IsInt, IsPositive } from 'class-validator';

export class CreateReservationDto {
  @IsInt()
  @IsPositive()
  idUser: number;
  @IsInt()
  @IsPositive()
  idSchedule: number;
  @IsInt()
  @IsPositive()
  idSeat: number;
}

import { IsInt, IsPositive } from 'class-validator';

export class CreateReservationsDetailDto {
  @IsInt()
  @IsPositive()
  idReservation: number;
  @IsInt()
  @IsPositive()
  idSeat: number;
}

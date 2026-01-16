import { PartialType } from '@nestjs/mapped-types';
import { CreateReservationsDetailDto } from './create-reservations_detail.dto';

export class UpdateReservationsDetailDto extends PartialType(CreateReservationsDetailDto) {}

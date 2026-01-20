import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { SeatsService } from 'src/seats/seats.service';
import { ReservationsDetailService } from 'src/reservations_detail/reservations_detail.service';
@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    private readonly seatsService: SeatsService,
    private readonly reservationsDetailService: ReservationsDetailService,
  ) {}
  async create(createReservationDto: CreateReservationDto) {
    console.log(createReservationDto, 'aa');
    //Se cambia el asiento a ocupado

    //Se crea la tabla reservation
    const newReservation = await this.reservationRepository.save({
      idUser: createReservationDto.idUser,
      idSchedule: createReservationDto.idSchedule,
    });
    await this.seatsService.changeStatus(createReservationDto.idSeat);
    //Se crea la tabla reservations detail
    await this.reservationsDetailService.create({
      idReservation: newReservation.id,
      idSeat: createReservationDto.idSeat,
    });
    return {
      message: 'Reservación creada con éxito',
      reservationId: newReservation.id,
    };
  }

  findAll() {
    return this.reservationRepository.find();
  }

  findOne(id: number) {
    return this.reservationRepository.findOneBy({ id });
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepository.update(id, updateReservationDto);
  }

  remove(id: number) {
    return this.reservationRepository.delete(id);
  }
}

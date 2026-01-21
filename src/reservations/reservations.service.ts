import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { SeatsService } from 'src/seats/seats.service';
import { ReservationsDetailService } from 'src/reservations_detail/reservations_detail.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LessThan } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
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

    const seatExists = await this.reservationsDetailService.findSeat(
      createReservationDto.idSeat,
    );

    if (seatExists) {
      throw new BadRequestException(
        'El asiento ya cuenta con una reserva activa.',
      );
    }
    //Se crea la tabla reservation
    const newReservation = await this.reservationRepository.save({
      idUser: createReservationDto.idUser,
      idSchedule: createReservationDto.idSchedule,
      status: 'PENDING',
      expiresAt: new Date(Date.now() + 1 * 60000),
    });
    //cambia el estado del asiento
    await this.seatsService.changeStatus(createReservationDto.idSeat);

    //  Crear el detalle

    await this.reservationsDetailService.create({
      idReservation: newReservation.id,
      idSeat: createReservationDto.idSeat,
    });

    return {
      message: 'Asiento bloqueado por 1 minutos',
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

  async paidReservation(id: number) {
    console.log('idReservation', id);
    const reservation = await this.reservationRepository.findOneBy({ id });
    console.log('reservation', reservation);
    if (!reservation) {
      throw new NotFoundException(`Reservation con ID ${id} no encontrado`);
    }

    const newStatus = 'PAID';

    await this.reservationRepository.update(id, { status: newStatus });

    return {
      message: `Estado del reservation ${id} cambiado a ${newStatus}`,
      enabled: newStatus,
    };
  }
  //expiracion de reservations que no pasaron a paid o pagadas
  @Cron(CronExpression.EVERY_MINUTE)
  async handleExpiredReservations() {
    console.log('1 minuto');
    const now = new Date();

    //buscamos los expirados
    const expired = await this.reservationRepository.find({
      where: {
        status: 'PENDING',
        expiresAt: LessThan(now),
      },
      relations: ['reservationsDetail'],
    });
    //liberamos asientos
    for (const res of expired) {
      for (const detail of res.reservationsDetail) {
        await this.seatsService.changeStatus(detail.idSeat);
      }

      //eliminamos
      await this.reservationRepository.remove(res);
    }
  }
}

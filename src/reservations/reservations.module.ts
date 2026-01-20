import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { Reservation } from './entities/reservation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatsService } from 'src/seats/seats.service';
import { SeatsModule } from 'src/seats/seats.module';
import { ReservationsDetailModule } from 'src/reservations_detail/reservations_detail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]),
    SeatsModule,
    ReservationsDetailModule,
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}

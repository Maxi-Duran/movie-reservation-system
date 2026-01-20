import { Module } from '@nestjs/common';
import { ReservationsDetailService } from './reservations_detail.service';
import { ReservationsDetailController } from './reservations_detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsDetail } from './entities/reservations_detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationsDetail])],
  controllers: [ReservationsDetailController],
  providers: [ReservationsDetailService],
  exports: [ReservationsDetailService],
})
export class ReservationsDetailModule {}

import { Injectable } from '@nestjs/common';
import { CreateReservationsDetailDto } from './dto/create-reservations_detail.dto';
import { UpdateReservationsDetailDto } from './dto/update-reservations_detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationsDetail } from './entities/reservations_detail.entity';
import { Repository } from 'typeorm';
@Injectable()
export class ReservationsDetailService {
  constructor(
    @InjectRepository(ReservationsDetail)
    private reservationsDetailRepository: Repository<ReservationsDetail>,
  ) {}
  create(createReservationsDetailDto: CreateReservationsDetailDto) {
    return this.reservationsDetailRepository.save(createReservationsDetailDto);
  }

  findAll() {
    return this.reservationsDetailRepository.find();
  }

  findOne(id: number) {
    return this.reservationsDetailRepository.findOneBy({ id });
  }

  update(id: number, updateReservationsDetailDto: UpdateReservationsDetailDto) {
    return this.reservationsDetailRepository.update(
      id,
      updateReservationsDetailDto,
    );
  }

  remove(id: number) {
    return this.reservationsDetailRepository.delete(id);
  }
}

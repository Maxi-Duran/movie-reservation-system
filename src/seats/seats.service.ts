import { Injectable } from '@nestjs/common';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Seat } from './entities/seat.entity';
import { Repository } from 'typeorm';
@Injectable()
export class SeatsService {
  constructor(
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
  ) {}
  create(createSeatDto: CreateSeatDto) {
    return this.seatRepository.save(createSeatDto);
  }

  findAll() {
    return this.seatRepository.find();
  }

  findOne(id: number) {
    return this.seatRepository.findOneBy({ id });
  }

  update(id: number, updateSeatDto: UpdateSeatDto) {
    return this.seatRepository.update(id, updateSeatDto);
  }

  remove(id: number) {
    return this.seatRepository.delete(id);
  }
}

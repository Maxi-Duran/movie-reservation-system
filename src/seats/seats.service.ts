import { Injectable } from '@nestjs/common';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Seat } from './entities/seat.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
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
  async findSeatsByRoomId(idRoom: number) {
    return await this.seatRepository.find({
      where: { idRoom: idRoom },
    });
  }
  async findSeatsByRoomIdEnabled(idRoom: number) {
    return await this.seatRepository.find({
      where: { idRoom: idRoom, enabled: true },
    });
  }

  async changeStatus(id: number) {
    console.log('idseat', id);
    const seat = await this.seatRepository.findOneBy({ id });
    console.log('Seat', seat);
    if (!seat) {
      throw new NotFoundException(`Asiento con ID ${id} no encontrado`);
    }

    const newStatus = !seat.enabled;

    await this.seatRepository.update(id, { enabled: newStatus });

    return {
      message: `Estado del asiento ${id} cambiado a ${newStatus}`,
      enabled: newStatus,
    };
  }
}

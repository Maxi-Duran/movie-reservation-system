import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservationsDetailService } from './reservations_detail.service';
import { CreateReservationsDetailDto } from './dto/create-reservations_detail.dto';
import { UpdateReservationsDetailDto } from './dto/update-reservations_detail.dto';

@Controller('reservations-detail')
export class ReservationsDetailController {
  constructor(private readonly reservationsDetailService: ReservationsDetailService) {}

  @Post()
  create(@Body() createReservationsDetailDto: CreateReservationsDetailDto) {
    return this.reservationsDetailService.create(createReservationsDetailDto);
  }

  @Get()
  findAll() {
    return this.reservationsDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservationsDetailDto: UpdateReservationsDetailDto) {
    return this.reservationsDetailService.update(+id, updateReservationsDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsDetailService.remove(+id);
  }
}

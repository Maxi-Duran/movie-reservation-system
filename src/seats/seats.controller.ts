import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SeatsService } from './seats.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoomsService } from 'src/rooms/rooms.service';
@Controller('seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createSeatDto: CreateSeatDto) {
    return this.seatsService.create(createSeatDto);
  }
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.seatsService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seatsService.findOne(+id);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeatDto: UpdateSeatDto) {
    return this.seatsService.update(+id, updateSeatDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seatsService.remove(+id);
  }
}

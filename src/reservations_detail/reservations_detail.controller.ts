import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReservationsDetailService } from './reservations_detail.service';
import { CreateReservationsDetailDto } from './dto/create-reservations_detail.dto';
import { UpdateReservationsDetailDto } from './dto/update-reservations_detail.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('reservations-detail')
export class ReservationsDetailController {
  constructor(
    private readonly reservationsDetailService: ReservationsDetailService,
  ) {}
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createReservationsDetailDto: CreateReservationsDetailDto) {
    return this.reservationsDetailService.create(createReservationsDetailDto);
  }
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.reservationsDetailService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsDetailService.findOne(+id);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationsDetailDto: UpdateReservationsDetailDto,
  ) {
    return this.reservationsDetailService.update(
      +id,
      updateReservationsDetailDto,
    );
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsDetailService.remove(+id);
  }
}

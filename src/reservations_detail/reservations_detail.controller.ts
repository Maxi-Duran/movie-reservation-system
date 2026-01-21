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
import { Roles } from 'src/auth/roles.decorador';
import { Role } from 'src/auth/rol.enum';
import { RolesGuard } from 'src/auth/rol.guard';
@Controller('reservations-detail')
export class ReservationsDetailController {
  constructor(
    private readonly reservationsDetailService: ReservationsDetailService,
  ) {}
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  create(@Body() createReservationsDetailDto: CreateReservationsDetailDto) {
    return this.reservationsDetailService.create(createReservationsDetailDto);
  }
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.reservationsDetailService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsDetailService.findOne(+id);
  }
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
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
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsDetailService.remove(+id);
  }
}

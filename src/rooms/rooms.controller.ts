import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { SeatsService } from 'src/seats/seats.service';
import { Roles } from 'src/auth/roles.decorador';
import { Role } from 'src/auth/rol.enum';
import { RolesGuard } from 'src/auth/rol.guard';
@Controller('rooms')
export class RoomsController {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly seatsService: SeatsService,
  ) {}
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.roomsService.findAll();
  }
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(+id);
  }
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto);
  }
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(+id);
  }
  @UseGuards(AuthGuard)
  @Get(':id/seats')
  getSeatsByRoom(@Param('id') id: string) {
    return this.seatsService.findSeatsByRoomId(+id);
  }
  @UseGuards(AuthGuard)
  @Get(':id/seats/enabled')
  getSeatsByRoomEnabled(@Param('id') id: string) {
    return this.seatsService.findSeatsByRoomIdEnabled(+id);
  }
}

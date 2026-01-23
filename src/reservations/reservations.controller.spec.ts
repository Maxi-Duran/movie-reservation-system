import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { Reservation } from './entities/reservation.entity';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SeatsService } from 'src/seats/seats.service';
import { ReservationsDetailService } from 'src/reservations_detail/reservations_detail.service';
describe('ReservationsController', () => {
  let controller: ReservationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationsController],
      providers: [
        ReservationsService,
        {
          provide: getRepositoryToken(Reservation), //le entregamos un token
          useValue: { find: jest.fn(), save: jest.fn() },
        },
        {
          provide: SeatsService,
          useValue: { findOne: jest.fn(), update: jest.fn() },
        },
        {
          provide: ReservationsDetailService,
          useValue: { findOne: jest.fn(), update: jest.fn() },
        },
        {
          //para evitar el authguard le entregamos un servicio falso
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ReservationsController>(ReservationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

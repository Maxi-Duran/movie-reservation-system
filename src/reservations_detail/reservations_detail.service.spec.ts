import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsDetailService } from './reservations_detail.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { ReservationsDetail } from './entities/reservations_detail.entity';
describe('ReservationsDetailService', () => {
  let service: ReservationsDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsDetailService,
        {
          provide: getRepositoryToken(ReservationsDetail), //le entregamos un token
          useValue: { find: jest.fn(), save: jest.fn() },
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

    service = module.get<ReservationsDetailService>(ReservationsDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

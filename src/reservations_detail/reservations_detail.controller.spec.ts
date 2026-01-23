import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsDetailController } from './reservations_detail.controller';
import { ReservationsDetailService } from './reservations_detail.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ReservationsDetail } from './entities/reservations_detail.entity';
import { JwtService } from '@nestjs/jwt';

describe('ReservationsDetailController', () => {
  let controller: ReservationsDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // Declaramos qué controlador queremos probar
      controllers: [ReservationsDetailController],
      providers: [
        ReservationsDetailService, // El servicio real que queremos probar
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
    // Extraemos la instancia del controlador ya  con sus piezas falsas
    controller = module.get<ReservationsDetailController>(
      ReservationsDetailController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

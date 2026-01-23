import { Test, TestingModule } from '@nestjs/testing';
import { SeatsService } from './seats.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Seat } from './entities/seat.entity';
describe('SeatsService', () => {
  let service: SeatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeatsService,
        {
          provide: getRepositoryToken(Seat), //le entregamos un token
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

    service = module.get<SeatsService>(SeatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

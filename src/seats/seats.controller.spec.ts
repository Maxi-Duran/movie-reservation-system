import { Test, TestingModule } from '@nestjs/testing';
import { SeatsController } from './seats.controller';
import { SeatsService } from './seats.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Seat } from './entities/seat.entity';
describe('SeatsController', () => {
  let controller: SeatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeatsController],
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

    controller = module.get<SeatsController>(SeatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

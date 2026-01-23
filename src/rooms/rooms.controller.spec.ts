import { Test, TestingModule } from '@nestjs/testing';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Room } from './entities/room.entity';
import { SeatsService } from 'src/seats/seats.service';
describe('RoomsController', () => {
  let controller: RoomsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomsController],
      providers: [
        RoomsService,
        {
          provide: getRepositoryToken(Room), //le entregamos un token
          useValue: { find: jest.fn(), save: jest.fn() },
        },
        {
          provide: SeatsService,
          useValue: { find: jest.fn(), update: jest.fn() },
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

    controller = module.get<RoomsController>(RoomsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

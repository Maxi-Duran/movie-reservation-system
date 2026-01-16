import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsDetailController } from './reservations_detail.controller';
import { ReservationsDetailService } from './reservations_detail.service';

describe('ReservationsDetailController', () => {
  let controller: ReservationsDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationsDetailController],
      providers: [ReservationsDetailService],
    }).compile();

    controller = module.get<ReservationsDetailController>(ReservationsDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

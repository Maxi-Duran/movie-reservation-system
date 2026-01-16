import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsDetailService } from './reservations_detail.service';

describe('ReservationsDetailService', () => {
  let service: ReservationsDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationsDetailService],
    }).compile();

    service = module.get<ReservationsDetailService>(ReservationsDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

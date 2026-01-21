import {
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { ReservationsDetail } from 'src/reservations_detail/entities/reservations_detail.entity';
import { Schedule } from 'src/schedules/entities/schedule.entity';
@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date;
  @Column({ default: 'PENDING' })
  status: string;
  @Column()
  idUser: number;
  @Column()
  idSchedule: number;
  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn({ name: 'idUser' })
  user: User;

  @OneToMany(
    () => ReservationsDetail,
    (reservatonDetail) => reservatonDetail.reservation,
  )
  reservationsDetail: ReservationsDetail[];

  @ManyToOne(() => Schedule, (schedule) => schedule.reservation)
  @JoinColumn({ name: 'idSchedule' })
  schedule: Schedule;
}

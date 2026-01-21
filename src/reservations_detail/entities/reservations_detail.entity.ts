import {
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Reservation } from 'src/reservations/entities/reservation.entity';
@Entity()
export class ReservationsDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idReservation: number;

  @Column()
  idSeat: number;

  @ManyToOne(
    () => Reservation,
    (reservation) => reservation.reservationsDetail,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'idReservation' })
  reservation: Reservation;
}

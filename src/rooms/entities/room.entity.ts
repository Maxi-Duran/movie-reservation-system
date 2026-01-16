import { Schedule } from 'src/schedules/entities/schedule.entity';
import { Seat } from 'src/seats/entities/seat.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn() id: number;

  @Column()
  number: number;

  @OneToMany(() => Seat, (seat) => seat.room)
  seat: Seat[];

  @OneToMany(() => Schedule, (schedule) => schedule.room)
  schedule: Schedule[];
}

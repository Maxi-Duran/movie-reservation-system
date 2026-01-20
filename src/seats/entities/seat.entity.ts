import {
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Room } from 'src/rooms/entities/room.entity';
@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  row: number;

  @Column()
  number: number;
  @Column()
  enabled: boolean;
  @Column()
  idRoom: number;

  @ManyToOne(() => Room, (room) => room.seat)
  @JoinColumn({ name: 'idRoom' })
  room: Room;
}

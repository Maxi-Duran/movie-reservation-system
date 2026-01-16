import { Movie } from 'src/movies/entities/movie.entity';
import { Room } from 'src/rooms/entities/room.entity';
import {
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Reservation } from 'src/reservations/entities/reservation.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idMovie: number;
  @Column()
  idRoom: number;

  @Column()
  dateTime: Date;
  @Column()
  price: number;

  @ManyToOne(() => Movie, (movie) => movie.schedule)
  @JoinColumn({ name: 'idMovie' })
  movie: Movie;

  @ManyToOne(() => Room, (room) => room.schedule)
  @JoinColumn({ name: 'idRoom' })
  room: Room;

  @OneToMany(() => Reservation, (reservation) => reservation.schedule)
  reservation: Reservation[];
}

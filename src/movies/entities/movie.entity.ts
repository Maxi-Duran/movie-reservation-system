import { Schedule } from 'src/schedules/entities/schedule.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
  @Column()
  description: string;

  @Column()
  image: string;

  @OneToMany(() => Schedule, (schedule) => schedule.movie)
  schedule: Schedule[];
}

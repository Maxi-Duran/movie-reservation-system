import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;
  @UpdateDateColumn({ type: 'timestamp' })
  UpdateAt: string;
}

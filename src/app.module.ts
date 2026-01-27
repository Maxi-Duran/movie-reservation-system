import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { ReservationsModule } from './reservations/reservations.module';
import { RoomsModule } from './rooms/rooms.module';
import { SeatsModule } from './seats/seats.module';
import { SchedulesModule } from './schedules/schedules.module';
import { ReservationsDetailModule } from './reservations_detail/reservations_detail.module';
import { Movie } from './movies/entities/movie.entity';
import { Room } from './rooms/entities/room.entity';
import { Reservation } from './reservations/entities/reservation.entity';
import { ReservationsDetail } from './reservations_detail/entities/reservations_detail.entity';
import { Seat } from './seats/entities/seat.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',

      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'myapp_dev',
      entities: [User, Movie, Room, Reservation, ReservationsDetail, Seat],
      autoLoadEntities: true,
      synchronize: true,
      ssl: false,
    }),
    UserModule,
    AuthModule,
    MoviesModule,
    ReservationsModule,
    RoomsModule,
    SeatsModule,
    SchedulesModule,
    ReservationsDetailModule,
    HealthModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}

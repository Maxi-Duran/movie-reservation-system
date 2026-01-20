import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';

import { SchedulesModule } from 'src/schedules/schedules.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), SchedulesModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}

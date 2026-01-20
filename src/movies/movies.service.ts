import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SchedulesService } from 'src/schedules/schedules.service';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,

    private scheduleService: SchedulesService,
  ) {}
  create(createMovieDto: CreateMovieDto) {
    return this.movieRepository.save(createMovieDto);
  }

  findAll() {
    return this.movieRepository.find();
  }

  findOne(id: number) {
    return this.movieRepository.findOneBy({ id });
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return this.movieRepository.update(id, updateMovieDto);
  }

  remove(id: number) {
    return this.movieRepository.delete(id);
  }
  getScheduleOfMovie(idMovie: number) {
    return this.scheduleService.findByMovieId(idMovie);
  }
}

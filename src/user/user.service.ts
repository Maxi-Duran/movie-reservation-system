import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: loginUserDto.email },
      });
      if (user && user.password === loginUserDto.password) {
        return { message: 'Login exitoso', status: 201, role: user.role };
      } else {
        throw new UnauthorizedException('Credenciales invalidas');
      }
    } catch (err) {
      if (err instanceof UnauthorizedException) {
        throw err;
      }
      throw new InternalServerErrorException('Invalid credentials');
    }
  }
}

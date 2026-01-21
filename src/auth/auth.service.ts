import { Injectable } from '@nestjs/common';

import { LoginUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtservice: JwtService,
  ) {}
  async login(loginUserDto: LoginUserDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: loginUserDto.email },
      });
      if (!user) {
        throw new UnauthorizedException('Credenciales inválidas');
      }

      const isMatch = await bcrypt.compare(
        loginUserDto.password,
        user.password,
      );

      if (!isMatch) {
        throw new UnauthorizedException('Credenciales inválidas');
      }
      const payload = { sub: user.id, name: user.name, role: user.role };
      return {
        message: 'Login exitoso',
        status: 201,
        role: user.role,
        access_token: await this.jwtservice.signAsync(payload),
      };

      throw new UnauthorizedException('Credenciales invalidas');
    } catch (err) {
      if (err instanceof UnauthorizedException) {
        throw err;
      }
      throw new InternalServerErrorException('Invalid credentials');
    }
  }
}

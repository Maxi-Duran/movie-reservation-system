import { Controller } from '@nestjs/common';
import { Post, Body, Res } from '@nestjs/common';
import { LoginUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import type { Response } from 'express';
import { HttpCode, HttpStatus } from '@nestjs/common';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() LoginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token, role, status, message } =
      await this.authService.login(LoginUserDto);
    response.cookie('access_token', access_token, {
      httpOnly: true,
      secure: false, // En producción (https) debe ser true
      sameSite: 'lax',
      expires: new Date(Date.now() + 3600000),
    });
    return {
      message,
      status,
      role,
    };
  }
}

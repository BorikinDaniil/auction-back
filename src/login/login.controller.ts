import { Controller, Body, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { PasswordService } from '../password/password.service';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from '../auth/auth.service';
import userModel from '../common/utils/models/EntityModels';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('login')
export class LoginController {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const email = loginDto.email.toLowerCase();
    const password = loginDto.password;

    const user = await this.userService.findOne({ email });

    if (!user) {
      return res.status(400).json({
        status: 'error',
        field: 'email',
        errors: { email: 'No user with such email' },
      });
    }

    const result = await this.passwordService.compare(password, user.password);

    if (!result) {
      return res.status(400).json({
        status: 'error',
        field: 'password',
        errors: { password: 'Wrong password' },
      });
    }

    const token = await this.authService.getToken({
      id: user.id,
    });

    return res.status(200).json({
      status: 'success',
      token,
      user: userModel(user),
    });
  }
}

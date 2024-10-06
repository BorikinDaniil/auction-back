import { Controller, Body, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { PasswordService } from '../password/password.service';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from '../auth/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { getErrorData, getResponse } from '../common/utils/response';

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

    const user = await this.userService.getUserWithPassword({ email });

    if (!user) {
      return getResponse(
        res,
        400,
        getErrorData('email', 'No user with such email'),
      );
    }

    const result = await this.passwordService.compare(password, user.password);

    if (!result) {
      return getResponse(res, 400, getErrorData('password', 'Wrong password'));
    }

    // TODO: Remove second redundant request to db
    const userData = await this.userService.findOne({ email });

    const token = await this.authService.getToken({
      id: userData.id,
    });

    const resData = {
      token,
      user: userData,
    };

    getResponse(res, 200, resData);
  }
}

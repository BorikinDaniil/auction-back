import { Controller, Body, Res, Post, UsePipes } from '@nestjs/common';
import { Response } from 'express';

import { PasswordService } from '../password/password.service';
import { UserService } from '../user/user.service';
import { RegistrationDto } from './dtos/registration.dto';
import { AuthService } from '../auth/auth.service';
import { ValidationPipe } from '../pipes/validation.pipes';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('registration')
export class RegistrationController {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UsePipes(ValidationPipe)
  @Post()
  async register(
    @Body() registrationDto: RegistrationDto,
    @Res() res: Response,
  ) {
    const email: string = registrationDto.email.toLowerCase();

    delete registrationDto.passwordConfirm;

    const user = await this.userService.findByEmailOrName(
      email,
      registrationDto.username,
    );

    const isEmailTaken: boolean = email === user?.email;
    const isUserNameTaken: boolean =
      registrationDto.username === user?.username;

    if (isEmailTaken || isUserNameTaken) {
      const field = isEmailTaken ? 'email' : 'username';

      return res.status(400).json({
        status: 'error',
        message: `This ${field} is already taken`,
        field,
      });
    }

    const { id, username, gender } = await this.userService.create({
      email,
      password: await this.passwordService.hash(registrationDto.password),
      username: registrationDto.username,
      gender: registrationDto.gender,
      isDeleted: false,
    });

    const token = await this.authService.getToken({ id });

    return res.status(200).json({
      status: 'success',
      token,
      user: {
        gender,
        username,
        id,
      },
    });
  }
}

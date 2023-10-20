import { Controller, Body, Res, Post } from '@nestjs/common';
import { Response } from 'express';

import { PasswordService } from '../password/password.service';
import { UserService } from '../user/user.service';
import { ValidationService } from '../validation/validation.service';
import { RegistrationDto } from './dtos/registration.dto';
import { AuthService } from '../auth/auth.service';

@Controller('registration')
export class RegistrationController {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly userService: UserService,
    private readonly validationService: ValidationService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async register(
    @Body() registrationDto: RegistrationDto,
    @Res() res: Response,
  ) {
    const email = registrationDto.email.toLowerCase();

    let isEmailTaken = false;
    let isUserNameTaken = false;

    const errors = await this.validationService.validate(
      RegistrationDto,
      registrationDto,
    );

    console.log('errors', errors);
    console.log('errors.length', errors.length);

    if (errors.length) {
      return res.status(400).json({
        status: 'error',
        message:
          'Password need to have 8 or more characters with a mix of letters numbers and symbols',
        field: 'password',
      });
    }

    delete registrationDto.passwordConfirm;

    const user = await this.userService.findByEmailOrName(
      email,
      registrationDto.username,
    );

    isEmailTaken = email === user?.email;
    isUserNameTaken = registrationDto.username === user?.username;

    if (isEmailTaken || isUserNameTaken) {
      const field = isEmailTaken ? 'email' : 'username';

      return res.status(400).json({
        status: 'error',
        message: `This ${field} is already taken`,
        field,
      });
    }

    const { id, username } = await this.userService.create({
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
        email,
        username,
        id,
      },
    });
  }
}

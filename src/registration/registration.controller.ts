import { Controller, Body, Res, Post, UsePipes } from '@nestjs/common';
import { Response } from 'express';

import { PasswordService } from '../password/password.service';
import { UserService } from '../user/user.service';
import { RegistrationDto } from './dtos/registration.dto';
import { AuthService } from '../auth/auth.service';
import { ValidationPipe } from '../pipes/validation.pipes';
import { ApiTags } from '@nestjs/swagger';
import { ProfilesService } from '../profiles/profiles.service';
import { getErrorData, getResponse } from '../common/utils/response';

@ApiTags('Auth')
@Controller('registration')
export class RegistrationController {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly profilesService: ProfilesService,
  ) {}

  @UsePipes(ValidationPipe)
  @Post()
  async register(
    @Body() registrationDto: RegistrationDto,
    @Res() res: Response,
  ) {
    const email: string = registrationDto.email.toLowerCase();

    delete registrationDto.passwordConfirm;

    const user = await this.userService.findByEmail(email);

    const profile = await this.profilesService.findByUserName(
      registrationDto.username,
    );

    const isEmailTaken: boolean = email === user?.email;
    const isUserNameTaken: boolean =
      registrationDto.username === profile?.username;

    if (isEmailTaken || isUserNameTaken) {
      const field = isEmailTaken ? 'email' : 'username';

      return getResponse(
        res,
        400,
        getErrorData(field, `This ${field} is already taken`),
      );
    }

    const newProfile = await this.profilesService.create({
      username: registrationDto.username,
      gender: registrationDto.gender,
    });

    const { id } = await this.userService.create(
      {
        email,
        password: await this.passwordService.hash(registrationDto.password),
      },
      newProfile,
    );

    const token = await this.authService.getToken({ id });

    const resData = {
      token,
      user: {
        gender: newProfile.gender,
        username: newProfile.username,
        id,
      },
    };

    return getResponse(res, 200, resData);
  }
}

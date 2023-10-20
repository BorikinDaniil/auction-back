import { Matches, Length, IsString, IsNumber } from 'class-validator';
import { PASSWORD_REGEXP, EMAIL_REGEXP } from '../../common/constants';
import { IsEqualWith } from '../../common/decorators/is-equal-with';

export class RegistrationDto {
  @IsString()
  username: string;

  @Matches(EMAIL_REGEXP, { always: true, message: 'Invalid email' })
  email: string;

  @Length(10, 30)
  @Matches(PASSWORD_REGEXP, {
    always: true,
    message:
      'Password must be between 6 and 64 characters long with 1 special character and capital character each',
  })
  password: string;

  @IsNumber()
  gender: number;

  @IsEqualWith({ context: 'password' })
  passwordConfirm: string;
}

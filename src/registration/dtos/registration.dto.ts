import { Matches, Length, IsString, IsNumber } from 'class-validator';
import { PASSWORD_REGEXP, EMAIL_REGEXP } from '../../common/constants';
import { IsEqualWith } from '../../common/decorators/is-equal-with';

export class RegistrationDto {
  @IsString()
  username: string;

  @Matches(EMAIL_REGEXP, { always: true })
  email: string;

  @Length(10, 30)
  @Matches(PASSWORD_REGEXP, { always: true })
  password: string;

  @IsNumber()
  gender: number;

  @IsEqualWith({ context: 'password' })
  passwordConfirm: string;
}

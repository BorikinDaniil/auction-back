import { IsString, Matches } from 'class-validator';
import { EMAIL_REGEXP } from '../../common/constants';

export class LoginDto {
  @Matches(EMAIL_REGEXP, { always: true })
  email: string;

  @IsString()
  password: string;
}

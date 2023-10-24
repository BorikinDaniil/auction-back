import { IsString, Matches } from 'class-validator';
import { EMAIL_REGEXP } from '../../common/constants';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'test@test.com', description: 'Email address' })
  @Matches(EMAIL_REGEXP, { always: true })
  email: string;

  @ApiProperty({ example: 'Password1@', description: 'Password' })
  @IsString()
  password: string;
}

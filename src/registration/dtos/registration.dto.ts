import { Matches, Length, IsString, IsNumber } from 'class-validator';
import { PASSWORD_REGEXP, EMAIL_REGEXP } from '../../common/constants';
import { IsEqualWith } from '../../common/decorators/is-equal-with';
import { ApiProperty } from '@nestjs/swagger';

export class RegistrationDto {
  @ApiProperty({ example: 'test_user_name', description: 'User Name' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'test@test.com', description: 'User Email' })
  @Matches(EMAIL_REGEXP, { always: true, message: 'Invalid email' })
  email: string;

  @ApiProperty({ example: 1, description: 'User Gender' })
  @IsNumber()
  gender: number;

  @ApiProperty({ example: 'Password1@', description: 'User Password' })
  @Length(6, 64, { message: 'Password must be between 6 and 64 characters long' })
  @Matches(PASSWORD_REGEXP, {
    always: true,
    message:
      'Password must contains at least 1 special character and capital character each',
  })
  password: string;

  @ApiProperty({
    example: 'Password1@',
    description: 'User Password confirmation',
  })
  @IsEqualWith({ context: 'password' })
  passwordConfirm: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ProfileDto {
  @ApiProperty({ example: 'test_user_name', description: 'User Name' })
  @IsString()
  username: string;

  // @ApiProperty({ example: 1, description: 'User Gender' })
  // @IsNumber()
  // gender: number;
}

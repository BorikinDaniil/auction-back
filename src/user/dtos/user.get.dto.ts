import { AbstractFullDto } from '../../common/dtos/abstract.full.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Profile } from '../../profiles/profile.entity';
import { PROFILE_EXAMPLE } from '../../common/entitiesExamples';

export class UserGetDto extends AbstractFullDto {
  @ApiProperty({ example: 'test_user_name', description: 'User Name' })
  @IsString()
  email: string;

  @ApiProperty({ example: PROFILE_EXAMPLE, description: 'User Profile' })
  @IsString()
  profile: Profile;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { AbstractDto } from './abstract.dto';

export class AbstractFullDto extends AbstractDto {
  @ApiProperty({
    example: '2024-10-31T21:17:43.994Z',
    description: 'Time of creating',
  })
  @IsString()
  createdAt: string;

  @ApiProperty({
    example: '2024-10-31T21:17:43.994Z',
    description: 'Last update time',
  })
  @IsString()
  updatedAt: string;
}
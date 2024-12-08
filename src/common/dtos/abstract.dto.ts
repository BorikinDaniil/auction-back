import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AbstractDto {
  @ApiProperty({ example: 1, description: 'Identifier' })
  @IsString()
  id: number;
}

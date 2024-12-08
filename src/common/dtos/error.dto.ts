import { ApiProperty } from '@nestjs/swagger';
import { LOGIN_BAD_REQUEST_EXAMPLE } from '../entitiesExamples';

export class ErrorDto {
  @ApiProperty({
    example: LOGIN_BAD_REQUEST_EXAMPLE,
    description: 'Start date and time of the auction',
  })
  errors: object;
}

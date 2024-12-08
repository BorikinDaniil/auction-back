import { Controller, Get, Res, UseGuards, Req } from '@nestjs/common';
import { Response, Request } from 'express';

import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.quard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { getResponse } from '../common/utils/response';
import { UserGetDto } from './dtos/user.get.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Get Current User',
    type: UserGetDto,
  })
  @Get('/me')
  async getUserByToken(@Req() req: Request, @Res() res: Response) {
    const id = await this.userService.getUserIdByToken(req);
    const user = await this.userService.findOne({ id });

    return getResponse(res, 200, user);
  }
}

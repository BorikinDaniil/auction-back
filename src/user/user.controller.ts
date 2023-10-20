import { Controller, Get, Res, UseGuards, Req } from '@nestjs/common';
import { Response, Request } from 'express';

import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.quard';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(@Req() req: Request, @Res() res: Response) {
    const reqUser: any = req['user'];
    const user = await this.userService.findOne({ id: reqUser.id });

    return res.status(200).json(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getUserByToken(@Req() req: Request, @Res() res: Response) {
    const id = await this.userService.getUserIdByToken(req);
    const {
      username,
      email,
      id: userId,
    } = await this.userService.findOne({ id });

    return res.status(200).json({ username, email, id: userId });
  }
}

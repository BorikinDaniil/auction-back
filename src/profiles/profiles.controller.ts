import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { Response } from 'express';
import { getResponse } from '../common/utils/response';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.quard';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async find(@Param('id') id: string, @Res() res: Response) {
    const profile = await this.profilesService.findOne({ id });

    return getResponse(res, 200, profile);
  }
}

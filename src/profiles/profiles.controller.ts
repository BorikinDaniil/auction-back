import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { Response } from 'express';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get('/:id')
  async find(@Param('id') id: string, @Res() res: Response) {
    return res.status(200).json(await this.profilesService.findOne({ id }));
  }
}

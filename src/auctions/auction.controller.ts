import {
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
  Req,
  Body,
  UseInterceptors,
  UploadedFiles,
  Param,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { AuctionService } from './auction.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.quard';
import { AuctionDto } from './dtos/auction.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FilesService } from '../files/files.service';
import { Files } from '../types/common';

@Controller('auctions')
export class AuctionController {
  constructor(
    private readonly auctionService: AuctionService,
    private readonly filesService: FilesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req: Request, @Res() res: Response) {
    return res.status(200).json(await this.auctionService.findAll());
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getAuctionById(@Param('id') id: number, @Res() res: Response) {
    return res.status(200).json(await this.auctionService.findOne({ id }));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image' }, { name: 'video' }]),
  )
  async create(
    @Req() req: Request,
    @Body() createDto: AuctionDto,
    @Res() res: Response,
    @UploadedFiles() files: Files,
  ) {
    const imageName = this.filesService.createFile(files.image, 'image');
    const videoName = this.filesService.createFile(files.video, 'video');

    await this.auctionService.create(req, {
      ...createDto,
      image: imageName,
      video: videoName,
    });

    return res.status(200).json({
      status: 'success',
      message: 'Auction created',
    });
  }
}

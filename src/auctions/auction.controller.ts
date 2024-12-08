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
  Query,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { AuctionService } from './auction.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.quard';
import { AuctionDto } from './dtos/auction.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FilesService } from '../files/files.service';
import { Files } from '../types/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { getResponse } from '../common/utils/response';
import { AuctionGetDto } from './dtos/auction.get.dto';
import { ErrorDto } from '../common/dtos/error.dto';
import { AuctionQueryDto } from './dtos/auction.query.dto';

@ApiTags('Auctions')
@Controller('auctions')
export class AuctionController {
  constructor(
    private readonly auctionService: AuctionService,
    private readonly filesService: FilesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    status: 200,
    description: 'Get Auctions List',
    type: [AuctionGetDto],
  })
  @Get()
  async findAll(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query: AuctionQueryDto,
    @Res() res: Response,
  ) {
    try {
      const data = await this.auctionService.findAllWithLimitPrices(query);
      return getResponse(res, 200, data);
    } catch (e) {
      getResponse(res, 500, e.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    status: 200,
    description: 'Get Auction by id',
    type: AuctionGetDto,
  })
  @Get(':id')
  async getAuctionById(@Param('id') id: number, @Res() res: Response) {
    const auction = await this.auctionService.findOne({ id });

    return getResponse(res, 200, auction);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBadRequestResponse({
    status: 400,
    description: 'Invalid Credentials',
    type: ErrorDto,
  })
  @UsePipes(ValidationPipe)
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
      startPrice: +createDto.startPrice,
      step: +createDto.step,
      image: imageName,
      video: videoName,
    });

    const resData = { message: 'Auction created' };

    return getResponse(res, 200, resData);
  }
}

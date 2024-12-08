import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.quard';
import { Response } from 'express';
import { getResponse } from '../common/utils/response';
import { CategoryGetDto } from './dtos/category.get.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Get Categories',
    type: CategoryGetDto,
  })
  @Get()
  async findAll(@Res() res: Response) {
    return getResponse(
      res,
      200,
      await this.categoriesService.getAllCategories({}, ['subCategories']),
    );
  }
}

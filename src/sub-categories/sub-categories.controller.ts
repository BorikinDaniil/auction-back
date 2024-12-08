import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.quard';
import { Response } from 'express';
import { getResponse } from '../common/utils/response';
import { SubCategoriesService } from './sub-categories.service';

@Controller('sub-categories')
export class SubCategoriesController {
  constructor(private readonly subCategoriesService: SubCategoriesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Res() res: Response) {
    return getResponse(
      res,
      200,
      await this.subCategoriesService.getAllSubcategories({}),
    );
  }
}

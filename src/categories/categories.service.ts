import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CATEGORIES, Category } from './category.entity';
import { Repository } from 'typeorm';
import { CategoriesParams } from '../types/requestsParams';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categories: Repository<Category>,
  ) {}

  async getAllCategories(
    where: CategoriesParams = {},
    relations: Array<string> = [],
  ): Promise<Category[]> {
    return await this.categories.find({ where, relations });
  }

  async getCategory(where: CategoriesParams = {}): Promise<Category> {
    return await this.categories.findOne({ where });
  }

  async createCategories() {
    const categories = await this.getAllCategories();

    if (categories.length === 0) {
      const defaultCategories = [];

      CATEGORIES.forEach((category) =>
        defaultCategories.push(this.categories.create(category)),
      );

      await this.categories.save(defaultCategories);
    }
  }
}

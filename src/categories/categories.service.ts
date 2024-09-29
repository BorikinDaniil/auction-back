import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CATEGORIES, Category } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categories: Repository<Category>,
  ) {}

  async getCategory(where: object): Promise<Category> {
    return await this.categories.findOne({ where });
  }

  async createCategories() {
    const categories = await this.categories.find();

    if (categories.length === 0) {
      const defaultCategories = [];

      CATEGORIES.forEach((category) =>
        defaultCategories.push(this.categories.create(category)),
      );

      await this.categories.save(defaultCategories);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SUB_CATEGORIES, SubCategory } from './sub-category.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';
import { SubCategoriesParams } from '../types/requestsParams';

@Injectable()
export class SubCategoriesService {
  constructor(
    @InjectRepository(SubCategory)
    private readonly subCategories: Repository<SubCategory>,
    private readonly categories: CategoriesService,
  ) {}

  async getAllSubcategories(
    where: SubCategoriesParams,
  ): Promise<SubCategory[]> {
    return await this.subCategories.find({ where });
  }

  async createSubCategories(): Promise<void> {
    const subCategories = await this.subCategories.find();

    if (subCategories.length === 0) {
      const defaultSubCategories = [];

      for (const subCategory of SUB_CATEGORIES) {
        const category = await this.categories.getCategory({
          name: subCategory.category,
        });

        if (!category) {
          throw `No category found for ${subCategory.name} subCategory`;
        }

        defaultSubCategories.push(
          this.subCategories.create({ name: subCategory.name, category }),
        );
      }

      await this.subCategories.save(defaultSubCategories);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';

import { Auction } from './auction.entity';
import { UserService } from '../user/user.service';
import { AuctionPayload } from '../types/common';
import { SubCategoriesService } from '../sub-categories/sub-categories.service';

@Injectable()
export class AuctionService {
  constructor(
    @InjectRepository(Auction)
    private readonly auction: Repository<Auction>,
    private readonly userService: UserService,
    private readonly subCategoriesService: SubCategoriesService,
  ) {}

  async create(req: Request, data: AuctionPayload): Promise<Auction> {
    const user = await this.userService.getUserByToken(req);

    const subCategoriesParams = data.subCategories.map((subCategory) => ({
      id: subCategory,
    }));
    const subCategories = await this.subCategoriesService.getAllSubcategories(
      subCategoriesParams,
    );

    const entity = this.auction.create({
      ...data,
      owner: user,
      subCategories,
    });

    return await this.auction.save(entity);
  }

  findOne(where): Promise<Auction> {
    return this.auction.findOne({
      where: {
        ...where,
        isDeleted: false,
      },
      relations: ['owner'],
    });
  }

  findAll(): Promise<Auction[]> {
    return this.auction.find({
      where: { isDeleted: false },
      relations: ['owner'],
    });
  }
}

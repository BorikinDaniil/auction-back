import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';

import { Auction } from './auction.entity';
import { UserService } from '../user/user.service';
import { AuctionPayload } from '../types/common';
import { SubCategoriesService } from '../sub-categories/sub-categories.service';
import { Cron } from '@nestjs/schedule';
import { AuctionParams, AuctionRelations } from '../types/requestsParams';
import {
  DEFAULT_AUCTION_PARAMS,
  DEFAULT_AUCTION_RELATIONS,
} from '../common/constants';
import { isBeforeOrEqual } from '../common/utils/date';

const getCheckedAuction = (auctions: Auction[]): Auction[] => {
  return auctions.map((auction) => {
    const { startAt, endAt, active } = auction;
    if (!active) {
      return {
        ...auction,
        active: isBeforeOrEqual(startAt),
      };
    }

    if (isBeforeOrEqual(endAt)) {
      return {
        ...auction,
        finished: true,
        active: false,
      };
    }

    return auction;
  });
};

@Injectable()
export class AuctionService {
  constructor(
    @InjectRepository(Auction)
    private readonly auctionService: Repository<Auction>,
    private readonly userService: UserService,
    private readonly subCategoriesService: SubCategoriesService,
  ) {}

  @Cron('45 * * * * *', { name: 'auction' })
  // @Cron('0 15 * * * *')
  async handleCron() {
    const notPastAuctions = await this.findAll({
      isDeleted: false,
      finished: false,
    });

    const checkedAuctions = getCheckedAuction(notPastAuctions);

    await this.auctionService.save(checkedAuctions);
  }

  async create(req: Request, data: AuctionPayload): Promise<Auction> {
    const user = await this.userService.getUserByToken(req);

    const subCategoriesParams = data.subCategories.map((subCategory) => ({
      id: subCategory,
    }));
    const subCategories = await this.subCategoriesService.getAllSubcategories(
      subCategoriesParams,
    );

    const entity = this.auctionService.create({
      ...data,
      owner: user,
      subCategories,
    });

    return await this.auctionService.save(entity);
  }

  findOne(where): Promise<Auction> {
    return this.auctionService.findOne({
      where: {
        ...where,
        isDeleted: false,
      },
      relations: ['owner'],
    });
  }

  findAll(
    where: AuctionParams = DEFAULT_AUCTION_PARAMS,
    relations: AuctionRelations = DEFAULT_AUCTION_RELATIONS,
  ): Promise<Auction[]> {
    return this.auctionService.find({
      where,
      relations,
    });
  }
}

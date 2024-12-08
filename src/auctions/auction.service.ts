import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Request } from 'express';

import { Auction } from './auction.entity';
import { UserService } from '../user/user.service';
import {
  AuctionPayload,
  AuctionStatus,
  AuctionsWithPagination,
} from '../types/common';
import { SubCategoriesService } from '../sub-categories/sub-categories.service';
import { Cron } from '@nestjs/schedule';
import {
  AuctionsQueryParams,
  AuctionRelations,
  CommonParams,
} from '../types/requestsParams';
import {
  DEFAULT_AUCTION_PARAMS,
  DEFAULT_AUCTION_RELATIONS,
  DEFAULT_AUCTION_SELECTION,
} from '../common/constants';
import { isBeforeOrEqual } from '../common/utils/date';
import { getParsedAuctionsQuery } from '../common/utils/parse-query';

const getCheckedAuction = (auctions: Auction[]): Auction[] => {
  return auctions.map((auction) => {
    const { startAt, endAt, status } = auction;
    if (status !== AuctionStatus.started) {
      return {
        ...auction,
        status: isBeforeOrEqual(startAt)
          ? AuctionStatus.started
          : auction.status,
      };
    }

    if (isBeforeOrEqual(endAt)) {
      return {
        ...auction,
        status: AuctionStatus.finished,
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

  // @Cron('45 * * * * *', { name: 'auctions' })
  @Cron('0 15 * * * *')
  async handleCron() {
    const notPastAuctions = await this.findAll({
      isDeleted: false,
      status: Not(AuctionStatus.finished),
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

  findOne(
    where: CommonParams = DEFAULT_AUCTION_PARAMS,
    relations: AuctionRelations = DEFAULT_AUCTION_RELATIONS,
  ): Promise<Auction> {
    return this.auctionService.findOne({
      where,
      relations,
    });
  }

  async findAll(
    where: AuctionsQueryParams = DEFAULT_AUCTION_PARAMS,
    relations: AuctionRelations = DEFAULT_AUCTION_RELATIONS,
    select = DEFAULT_AUCTION_SELECTION,
  ): Promise<Auction[]> {
    const parsedWhere = getParsedAuctionsQuery(where);

    return this.auctionService.find({
      where: parsedWhere,
      relations,
      select,
      // With relations ids
      // loadRelationIds: true,
    });
  }

  async findAllWithPagination(
    where: AuctionsQueryParams = DEFAULT_AUCTION_PARAMS,
    relations: AuctionRelations = DEFAULT_AUCTION_RELATIONS,
    select = DEFAULT_AUCTION_SELECTION,
  ): Promise<AuctionsWithPagination> {
    const parsedWhere = getParsedAuctionsQuery(where);
    const { page, pageSize } = where;
    const take = +pageSize || 10;
    const skip = (+page - 1) * +pageSize || 0;

    const [auctions, total] = await this.auctionService.findAndCount({
      where: parsedWhere,
      take,
      skip,
      relations,
      select,
    });

    return {
      auctions,
      pagination: { total, page: +page, pageSize: take },
    };
  }

  async findAllWithLimitPrices(
    where: AuctionsQueryParams = DEFAULT_AUCTION_PARAMS,
    relations: AuctionRelations = DEFAULT_AUCTION_RELATIONS,
    select = DEFAULT_AUCTION_SELECTION,
  ): Promise<{ auctionsData: AuctionsWithPagination; limitPrices: number[] }> {
    const [auctionsData, limitPrices] = await Promise.all([
      this.findAllWithPagination(where, relations, select),
      this.getLimitPrices(),
    ]);

    return { auctionsData, limitPrices };
  }

  getLimitPrices(): Promise<number[]> {
    return Promise.all([this.getMinPrice(), this.getMaxPrice()]);
  }

  async getMinPrice() {
    const auction = await this.auctionService.find({
      where: DEFAULT_AUCTION_PARAMS,
      order: {
        startPrice: 'ASC',
      },
      take: 1,
    });

    return auction[0]?.startPrice || 0;
  }

  async getMaxPrice() {
    const auction = await this.auctionService.find({
      where: DEFAULT_AUCTION_PARAMS,
      order: {
        startPrice: 'DESC',
      },
      take: 1,
    });

    return auction[0]?.startPrice || 0;
  }
}

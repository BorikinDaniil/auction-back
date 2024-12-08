import { AuctionDto } from '../auctions/dtos/auction.dto';
import { Auction } from '../auctions/auction.entity';

export type Files = {
  image?: File[];
  video: File[];
};

export type AuctionPayload = AuctionDto & {
  image: string;
  video: string;
};

export enum Gender {
  male = 1,
  female,
}

export enum AuctionStatus {
  awaiting = 1,
  started,
  finished,
}

export type AuctionsWithPagination = {
  auctions: Auction[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
  };
};

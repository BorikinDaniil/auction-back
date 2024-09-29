import { AuctionDto } from '../auctions/dtos/auction.dto';

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

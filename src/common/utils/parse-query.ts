import {
  AuctionsParsedParams,
  AuctionsQueryParams,
} from '../../types/requestsParams';
import { Like, Between } from 'typeorm';

export const getParsedAuctionsQuery = (
  query: AuctionsQueryParams,
): AuctionsParsedParams => {
  const {
    subCategories,
    productName,
    startAtFrom,
    startAtTo,
    endAtFrom,
    endAtTo,
    priceFrom,
    priceTo,
    status,
  } = query;

  const parsedQuery: AuctionsParsedParams = {};

  if (subCategories) {
    parsedQuery.subCategories = subCategories.map((id) => {
      const idNum = +id;
      if (!idNum) throw 'incorrect subCategories';

      return {
        id: +id,
      };
    });
  }

  if (productName) {
    parsedQuery.productName = Like(`%${query.productName}%`);
  }

  if (startAtFrom && startAtTo) {
    parsedQuery.startAt = Between(query.startAtFrom, query.startAtTo);
  }

  if (endAtFrom && endAtTo) {
    parsedQuery.endAt = Between(query.endAtFrom, query.endAtTo);
  }

  if (priceFrom && priceTo) {
    parsedQuery.startPrice = Between(+query.priceFrom, +query.priceTo);
  }

  if (status) {
    console.log('status', status);
    parsedQuery.status = +status;
  }

  return parsedQuery;
};

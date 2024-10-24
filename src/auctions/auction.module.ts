import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuctionController } from './auction.controller';
import { AuctionService } from './auction.service';
import { Auction } from './auction.entity';
import { FilesModule } from '../files/files.module';
import { UserModule } from '../user/user.module';
import { SubCategoriesModule } from '../sub-categories/sub-categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auction]),
    FilesModule,
    UserModule,
    SubCategoriesModule,
  ],
  controllers: [AuctionController],
  providers: [AuctionService],
  exports: [AuctionService],
})
export class AuctionModule {}

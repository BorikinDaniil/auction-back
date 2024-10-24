import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../user/user.entity';
import { IsNumber, IsString } from 'class-validator';
import { AbstractEntity } from '../database/abstract.entity';
import { SubCategory } from '../sub-categories/sub-category.entity';

@Entity({ name: 'auctions' })
export class Auction extends AbstractEntity<Auction> {
  @Column({ type: 'varchar', default: '' })
  @IsString()
  productName: string;

  @Column({ type: 'varchar', default: '' })
  @IsString()
  productDescription: string;

  @Column({ type: 'varchar', default: '0' })
  @IsNumber()
  startPrice: string;

  @Column({ type: 'varchar', default: '0' })
  @IsNumber()
  step: string;

  @Column({ type: 'timestamptz' })
  startAt: string;

  @Column({ type: 'timestamptz' })
  endAt: string;

  @Column({ type: 'varchar', default: null, nullable: true })
  image: string;

  @Column({ type: 'varchar', default: null, nullable: true })
  video: string;

  @Column({ type: 'bool', default: false })
  active: boolean;

  @Column({ type: 'bool', default: false })
  finished: boolean;

  @ManyToOne(() => User, (user) => user.auctions, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  owner: User;

  @ManyToMany(() => SubCategory, (subCategory) => subCategory.auctions, {
    onDelete: 'SET NULL',
  })
  @JoinTable()
  subCategories: SubCategory[];
}

import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../database/abstract.entity';
import { Category } from '../categories/category.entity';
import { Auction } from '../auctions/auction.entity';

export const SUB_CATEGORIES = [
  { name: 'Phone', category: 'Electronics' },
  { name: 'TV', category: 'Electronics' },
  { name: 'Ring', category: 'Jewelry' },
  { name: 'Earrings', category: 'Jewelry' },
];

@Entity('subCategories')
export class SubCategory extends AbstractEntity<SubCategory> {
  @Column({ type: 'varchar', unique: true })
  name: string;

  @ManyToOne(() => Category, (category) => category.subCategories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Auction, (auction) => auction.subCategories, {
    onDelete: 'SET NULL',
  })
  auctions: Auction[];
}

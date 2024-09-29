import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../database/abstract.entity';
import { SubCategory } from '../sub-categories/sub-category.entity';

export const CATEGORIES = [{ name: 'Electronics' }, { name: 'Jewelry' }];

@Entity('categories')
export class Category extends AbstractEntity<Category> {
  @Column({ type: 'varchar', unique: true })
  name: string;

  @OneToMany(() => SubCategory, (subCategory) => subCategory.category)
  subCategories: SubCategory[];
}

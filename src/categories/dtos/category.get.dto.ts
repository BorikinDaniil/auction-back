import { ApiProperty } from '@nestjs/swagger';
import { subCategoryExample } from '../../common/entitiesExamples';
import { SubCategory } from '../../sub-categories/sub-category.entity';
import { AbstractDto } from '../../common/dtos/abstract.dto';

export class CategoryGetDto extends AbstractDto {
  @ApiProperty({
    example: 'Jewelry',
    description: 'Category name',
  })
  name: string;

  @ApiProperty({
    example: [subCategoryExample],
    description: 'Subcategories',
  })
  subCategories: SubCategory[];
}

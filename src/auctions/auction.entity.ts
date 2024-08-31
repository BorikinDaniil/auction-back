import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';
import { IsNumber, IsString } from 'class-validator';

@Entity({ name: 'auctions' })
export class Auction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
  isDeleted: boolean;

  @Column({ type: 'bool', default: false })
  active: boolean;

  @Column({ type: 'bool', default: false })
  finished: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: string;

  @ManyToOne(() => User, (user) => user.auctions)
  owner: User;
}

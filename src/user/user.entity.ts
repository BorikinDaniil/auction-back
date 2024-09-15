import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Auction } from '../auctions/auction.entity';
import { Profile } from '../profiles/profile.entity';
import { AbstractEntity } from '../database/abstract.entity';

@Entity({ name: 'users' })
export class User extends AbstractEntity<User> {
  @Column({ type: 'varchar', unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', select: false })
  password: string;

  @OneToMany(() => Auction, (auction) => auction.owner)
  auctions: Auction[];

  @OneToOne(() => Profile, (profile) => profile.owner)
  @JoinColumn({ name: 'profileId_id' })
  profile: Profile;
}

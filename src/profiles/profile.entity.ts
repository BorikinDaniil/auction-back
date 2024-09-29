import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { AbstractEntity } from '../database/abstract.entity';
import { Gender } from '../types/common';

@Entity({ name: 'profiles' })
export class Profile extends AbstractEntity<Profile> {
  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'integer', enum: Gender, nullable: true, default: null })
  gender: Gender;

  @Column({ type: 'bool', default: false })
  isDeleted: boolean;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'user_id' })
  owner: User;
}

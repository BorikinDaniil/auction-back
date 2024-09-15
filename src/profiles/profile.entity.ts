import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from '../user/user.entity';
import { AbstractEntity } from '../database/abstract.entity';

@Entity({ name: 'profiles' })
export class Profile extends AbstractEntity<Profile> {
  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'integer' })
  gender: number;

  @Column({ type: 'bool', default: false })
  isDeleted: boolean;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'user_id' })
  owner: User;
}

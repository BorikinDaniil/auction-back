import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { Repository } from 'typeorm';
import { ProfileDto } from './dtos/profile.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profile: Repository<Profile>,
  ) {}

  async create(data: ProfileDto): Promise<Profile> {
    const entity: Profile = this.profile.create({ ...data });
    return await this.profile.save(entity);
  }

  async findOne(where): Promise<Profile> {
    return this.profile.findOne({
      where: {
        ...where,
        isDeleted: false,
      },
      relations: ['owner'],
    });
  }

  async findByUserName(username: string): Promise<Profile> {
    return this.profile
      .createQueryBuilder('profile')
      .where('profile.username = :username', { username })
      .andWhere('profile.isDeleted = :isDeleted', { isDeleted: false })
      .getOne();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';

import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../login/dtos/login.dto';
import { Profile } from '../profiles/profile.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(data: LoginDto, profile: Profile): Promise<User> {
    const entity: User = this.user.create({ ...data, profile });
    return await this.user.save(entity);
  }

  async findOne(where: object): Promise<User> {
    return this.user.findOne({
      where: {
        ...where,
        isDeleted: false,
      },
    });
  }

  async getUserWithPassword(where: object): Promise<User> {
    return this.user.findOne({
      where: {
        ...where,
        isDeleted: false,
      },
      select: {
        password: true,
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.user
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .andWhere('user.isDeleted = :isDeleted', { isDeleted: false })
      .getOne();
  }

  async getUserByToken(req: Request): Promise<User> {
    const token: string = req.headers.authorization.split(' ')[1];
    return this.jwtService.verify(token);
  }

  async getUserIdByToken(req: Request): Promise<number> {
    const { id } = await this.getUserByToken(req);
    return id;
  }
}

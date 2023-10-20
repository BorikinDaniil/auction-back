import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';

import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(data?): Promise<any> {
    const entity = await this.user.create(data || {});
    return await this.user.save(entity);
  }

  findOne(where): Promise<User> {
    return this.user.findOne({
      where: {
        ...where,
        isDeleted: false,
      },
    });
  }

  findByEmailOrName(email: string, username: string): Promise<User> {
    return this.user
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .orWhere('user.username = :username', { username })
      .andWhere('user.isDeleted = :isDeleted', { isDeleted: false })
      .getOne();
  }

  async getUserIdByToken(req: Request) {
    const token: string = req.headers.authorization.split(' ')[1];
    const { id } = this.jwtService.verify(token);
    return id;
  }
}

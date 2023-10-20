import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  getToken(payload: { id: string }): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  async verify(token: string): Promise<any> {
    if (!token) {
      return { id: null };
    }
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (e) {
      return { id: null };
    }
  }
}

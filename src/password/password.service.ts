import { Injectable } from '@nestjs/common';
import * as generator from 'generate-password';
import * as bcrypt from 'bcrypt';

import { PASSWORD_GENERATOR_SETTINGS } from '../common/constants';

@Injectable()
export class PasswordService {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(+process.env.BCRYPT_SALT_ROUNDS);
    return await bcrypt.hash(password, salt);
  }

  compare(data: string, hash: string): Promise<boolean> {
    return bcrypt.compare(data, hash);
  }

  async generate(): Promise<string> {
    return new Promise((resolve) => {
      resolve(generator.generate(PASSWORD_GENERATOR_SETTINGS));
    });
  }
}

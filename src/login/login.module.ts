import { Module } from '@nestjs/common';

import { LoginController } from './login.controller';
import { PasswordModule } from '../password/password.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [LoginController],
  imports: [PasswordModule, UserModule, AuthModule],
})
export class LoginModule {}

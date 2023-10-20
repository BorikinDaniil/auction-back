import { Module } from '@nestjs/common';

import { LoginController } from './login.controller';
import { PasswordModule } from '../password/password.module';
import { UserModule } from '../user/user.module';
import { ValidationModule } from '../validation/validation.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [LoginController],
  imports: [PasswordModule, UserModule, ValidationModule, AuthModule],
})
export class LoginModule {}

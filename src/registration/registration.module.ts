import { Module } from '@nestjs/common';

import { RegistrationController } from './registration.controller';
import { PasswordModule } from '../password/password.module';
import { UserModule } from '../user/user.module';
import { ValidationModule } from '../validation/validation.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [RegistrationController],
  imports: [PasswordModule, UserModule, ValidationModule, AuthModule],
})
export class RegistrationModule {}

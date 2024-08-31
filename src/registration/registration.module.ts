import { Module } from '@nestjs/common';

import { RegistrationController } from './registration.controller';
import { PasswordModule } from '../password/password.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { ProfilesModule } from '../profiles/profiles.module';

@Module({
  controllers: [RegistrationController],
  imports: [PasswordModule, UserModule, AuthModule, ProfilesModule],
})
export class RegistrationModule {}

import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import * as path from 'path';

import { AppController } from './app.controller';

import { AuthModule } from './auth/auth.module';
import { LoginModule } from './login/login.module';
import { PasswordModule } from './password/password.module';
import { RegistrationModule } from './registration/registration.module';
import { UserModule } from './user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuctionModule } from './auctions/auction.module';
import { ProfilesModule } from './profiles/profiles.module';
import { CategoriesModule } from './categories/categories.module';
import { SubCategoriesModule } from './sub-categories/sub-categories.module';
import { CategoriesService } from './categories/categories.service';
import { SubCategoriesService } from "./sub-categories/sub-categories.service";

const {
  TYPEORM_CONNECTION,
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE,
  TYPEORM_ENTITIES_PATH,
  TYPEORM_SYNCHRONIZE,
  TYPEORM_MIGRATIONS,
} = process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: TYPEORM_CONNECTION as 'postgres',
      host: TYPEORM_HOST,
      port: +TYPEORM_PORT,
      username: TYPEORM_USERNAME,
      password: TYPEORM_PASSWORD,
      database: TYPEORM_DATABASE,
      entities: [path.join(__dirname, TYPEORM_ENTITIES_PATH)],
      synchronize: TYPEORM_SYNCHRONIZE === 'true' || false,
      migrations: [TYPEORM_MIGRATIONS],
      migrationsTableName: 'migrations',
    }),
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: process.env.JWT_SECRET_KEY,
        };
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, 'static'),
    }),
    AuthModule,
    LoginModule,
    PasswordModule,
    RegistrationModule,
    UserModule,
    AuctionModule,
    ProfilesModule,
    CategoriesModule,
    SubCategoriesModule,
  ],
  controllers: [AppController],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly subCategoriesService: SubCategoriesService,
  ) {}

  async onModuleInit() {
    await this.categoriesService.createCategories();
    await this.subCategoriesService.createSubCategories();
  }
}

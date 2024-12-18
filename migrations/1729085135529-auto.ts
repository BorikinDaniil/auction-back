import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1729085135529 implements MigrationInterface {
    name = 'Auto1729085135529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "auctions" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "productName" character varying NOT NULL DEFAULT '', "productDescription" character varying NOT NULL DEFAULT '', "startPrice" character varying NOT NULL DEFAULT '0', "step" character varying NOT NULL DEFAULT '0', "startAt" TIMESTAMP WITH TIME ZONE NOT NULL, "endAt" TIMESTAMP WITH TIME ZONE NOT NULL, "image" character varying, "video" character varying, "active" boolean NOT NULL DEFAULT false, "finished" boolean NOT NULL DEFAULT false, "user_id" integer, CONSTRAINT "PK_87d2b34d4829f0519a5c5570368" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."profiles_gender_enum" AS ENUM('1', '2')`);
        await queryRunner.query(`CREATE TABLE "profiles" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "username" character varying NOT NULL, "gender" "public"."profiles_gender_enum", "user_id" integer, CONSTRAINT "REL_9e432b7df0d182f8d292902d1a" UNIQUE ("user_id"), CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "email" character varying NOT NULL, "password" character varying NOT NULL, "profileId_id" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_0329b247eb77b13a88d5032b05" UNIQUE ("profileId_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "name" character varying NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subCategories" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "name" character varying NOT NULL, "category_id" integer, CONSTRAINT "UQ_adb1d3d35d733cb2bc640a1fed5" UNIQUE ("name"), CONSTRAINT "PK_d22319d65c44efc1d19c4a08989" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "auctions" ADD CONSTRAINT "FK_beac2d18be0914838fb34652ae2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_9e432b7df0d182f8d292902d1a2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_0329b247eb77b13a88d5032b05e" FOREIGN KEY ("profileId_id") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subCategories" ADD CONSTRAINT "FK_5fdeaec083b0032b77b7d5a201d" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subCategories" DROP CONSTRAINT "FK_5fdeaec083b0032b77b7d5a201d"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_0329b247eb77b13a88d5032b05e"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_9e432b7df0d182f8d292902d1a2"`);
        await queryRunner.query(`ALTER TABLE "auctions" DROP CONSTRAINT "FK_beac2d18be0914838fb34652ae2"`);
        await queryRunner.query(`DROP TABLE "subCategories"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "profiles"`);
        await queryRunner.query(`DROP TYPE "public"."profiles_gender_enum"`);
        await queryRunner.query(`DROP TABLE "auctions"`);
    }

}

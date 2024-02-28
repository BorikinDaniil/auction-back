import {MigrationInterface, QueryRunner} from "typeorm";

export class init1709059326866 implements MigrationInterface {
    name = 'init1709059326866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "username" character varying NOT NULL, "gender" integer NOT NULL, "isDeleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "productName" character varying NOT NULL DEFAULT '', "productDescription" character varying NOT NULL DEFAULT '', "startPrice" character varying NOT NULL DEFAULT '0', "step" character varying NOT NULL DEFAULT '0', "startAt" TIMESTAMP WITH TIME ZONE NOT NULL, "endAt" TIMESTAMP WITH TIME ZONE NOT NULL, "image" character varying, "video" character varying, "isDeleted" boolean NOT NULL DEFAULT false, "active" boolean NOT NULL DEFAULT false, "finished" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "ownerId" uuid, CONSTRAINT "PK_9dc876c629273e71646cf6dfa67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "auction" ADD CONSTRAINT "FK_612921ecd63175bd714dc1b1291" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auction" DROP CONSTRAINT "FK_612921ecd63175bd714dc1b1291"`);
        await queryRunner.query(`DROP TABLE "auction"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}

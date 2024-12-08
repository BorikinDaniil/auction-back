import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1731961819181 implements MigrationInterface {
    name = 'Auto1731961819181'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auctions" DROP COLUMN "startPrice"`);
        await queryRunner.query(`ALTER TABLE "auctions" ADD "startPrice" numeric NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auctions" DROP COLUMN "startPrice"`);
        await queryRunner.query(`ALTER TABLE "auctions" ADD "startPrice" integer NOT NULL DEFAULT '0'`);
    }

}

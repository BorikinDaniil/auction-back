import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1731961486189 implements MigrationInterface {
    name = 'Auto1731961486189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auctions" DROP COLUMN "startPrice"`);
        await queryRunner.query(`ALTER TABLE "auctions" ADD "startPrice" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auctions" DROP COLUMN "startPrice"`);
        await queryRunner.query(`ALTER TABLE "auctions" ADD "startPrice" character varying NOT NULL DEFAULT '0'`);
    }

}

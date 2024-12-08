import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1732573127491 implements MigrationInterface {
    name = 'Auto1732573127491'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auctions" DROP COLUMN "startPrice"`);
        await queryRunner.query(`ALTER TABLE "auctions" ADD "startPrice" integer NOT NULL DEFAULT '100'`);
        await queryRunner.query(`ALTER TABLE "auctions" DROP COLUMN "step"`);
        await queryRunner.query(`ALTER TABLE "auctions" ADD "step" integer NOT NULL DEFAULT '10'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auctions" DROP COLUMN "step"`);
        await queryRunner.query(`ALTER TABLE "auctions" ADD "step" numeric NOT NULL DEFAULT '10'`);
        await queryRunner.query(`ALTER TABLE "auctions" DROP COLUMN "startPrice"`);
        await queryRunner.query(`ALTER TABLE "auctions" ADD "startPrice" numeric NOT NULL DEFAULT '100'`);
    }

}

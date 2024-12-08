import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1731961961048 implements MigrationInterface {
    name = 'Auto1731961961048'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auctions" ALTER COLUMN "startPrice" SET DEFAULT '100'`);
        await queryRunner.query(`ALTER TABLE "auctions" DROP COLUMN "step"`);
        await queryRunner.query(`ALTER TABLE "auctions" ADD "step" numeric NOT NULL DEFAULT '10'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auctions" DROP COLUMN "step"`);
        await queryRunner.query(`ALTER TABLE "auctions" ADD "step" character varying NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "auctions" ALTER COLUMN "startPrice" SET DEFAULT '0'`);
    }

}

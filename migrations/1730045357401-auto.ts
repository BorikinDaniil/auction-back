import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1730045357401 implements MigrationInterface {
    name = 'Auto1730045357401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auctions" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "auctions" DROP COLUMN "finished"`);
        await queryRunner.query(`ALTER TABLE "auctions" ADD "status" boolean NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auctions" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "auctions" ADD "finished" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "auctions" ADD "active" boolean NOT NULL DEFAULT false`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1730045511255 implements MigrationInterface {
    name = 'Auto1730045511255'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auctions" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "auctions" ADD "status" integer NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auctions" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "auctions" ADD "status" boolean NOT NULL DEFAULT true`);
    }

}

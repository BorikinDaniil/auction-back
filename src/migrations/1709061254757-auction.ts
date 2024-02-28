import {MigrationInterface, QueryRunner} from "typeorm";

export class auction1709061254757 implements MigrationInterface {
    name = 'auction1709061254757'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auction" DROP COLUMN "description"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auction" ADD "description" character varying NOT NULL DEFAULT ''`);
    }

}

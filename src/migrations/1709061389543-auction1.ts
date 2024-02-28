import {MigrationInterface, QueryRunner} from "typeorm";

export class auction11709061389543 implements MigrationInterface {
    name = 'auction11709061389543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auction" DROP COLUMN "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auction" ADD "name" character varying NOT NULL`);
    }

}

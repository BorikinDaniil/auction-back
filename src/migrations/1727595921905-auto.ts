import {MigrationInterface, QueryRunner} from "typeorm";

export class auto1727595921905 implements MigrationInterface {
    name = 'auto1727595921905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles" ALTER COLUMN "gender" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles" ALTER COLUMN "gender" SET NOT NULL`);
    }

}

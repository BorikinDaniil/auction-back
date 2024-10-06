import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1728214466445 implements MigrationInterface {
    name = 'auto1728214466445'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles" DROP COLUMN "gender"`);
        await queryRunner.query(`CREATE TYPE "public"."profiles_gender_enum" AS ENUM('1', '2')`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD "gender" "public"."profiles_gender_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles" DROP COLUMN "gender"`);
        await queryRunner.query(`DROP TYPE "public"."profiles_gender_enum"`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD "gender" integer`);
    }

}

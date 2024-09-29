import {MigrationInterface, QueryRunner} from "typeorm";

export class auto1727451251697 implements MigrationInterface {
    name = 'auto1727451251697'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subCategories" DROP CONSTRAINT "FK_2532fb5f89161f5c2da86e05e39"`);
        await queryRunner.query(`ALTER TABLE "subCategories" RENAME COLUMN "user_id" TO "category_id"`);
        await queryRunner.query(`ALTER TABLE "subCategories" ADD CONSTRAINT "FK_5fdeaec083b0032b77b7d5a201d" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subCategories" DROP CONSTRAINT "FK_5fdeaec083b0032b77b7d5a201d"`);
        await queryRunner.query(`ALTER TABLE "subCategories" RENAME COLUMN "category_id" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "subCategories" ADD CONSTRAINT "FK_2532fb5f89161f5c2da86e05e39" FOREIGN KEY ("user_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

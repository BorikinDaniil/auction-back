import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1729502800404 implements MigrationInterface {
    name = 'Auto1729502800404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "auction_subCategories" ("subCategories_id" integer NOT NULL, "subCategoriesId" integer NOT NULL, CONSTRAINT "PK_11613dac57dc79608d63a080d08" PRIMARY KEY ("subCategories_id", "subCategoriesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5d106da1c28e1dd3dfb586c795" ON "auction_subCategories" ("subCategories_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_2879a2a2203352a3f070f28ba2" ON "auction_subCategories" ("subCategoriesId") `);
        await queryRunner.query(`ALTER TABLE "auction_subCategories" ADD CONSTRAINT "FK_5d106da1c28e1dd3dfb586c7957" FOREIGN KEY ("subCategories_id") REFERENCES "auctions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "auction_subCategories" ADD CONSTRAINT "FK_2879a2a2203352a3f070f28ba2b" FOREIGN KEY ("subCategoriesId") REFERENCES "subCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auction_subCategories" DROP CONSTRAINT "FK_2879a2a2203352a3f070f28ba2b"`);
        await queryRunner.query(`ALTER TABLE "auction_subCategories" DROP CONSTRAINT "FK_5d106da1c28e1dd3dfb586c7957"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2879a2a2203352a3f070f28ba2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5d106da1c28e1dd3dfb586c795"`);
        await queryRunner.query(`DROP TABLE "auction_subCategories"`);
    }

}

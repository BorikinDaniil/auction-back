import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1729502213315 implements MigrationInterface {
    name = 'Auto1729502213315'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "auctions_sub_categories_sub_categories" ("auctionsId" integer NOT NULL, "subCategoriesId" integer NOT NULL, CONSTRAINT "PK_85a7f5172530ddf1f6428f2877d" PRIMARY KEY ("auctionsId", "subCategoriesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_384e1c8fbf2d6b8109cb4ef40f" ON "auctions_sub_categories_sub_categories" ("auctionsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_981dca2fbdc9c13849fb01f1f0" ON "auctions_sub_categories_sub_categories" ("subCategoriesId") `);
        await queryRunner.query(`ALTER TABLE "auctions_sub_categories_sub_categories" ADD CONSTRAINT "FK_384e1c8fbf2d6b8109cb4ef40fd" FOREIGN KEY ("auctionsId") REFERENCES "auctions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "auctions_sub_categories_sub_categories" ADD CONSTRAINT "FK_981dca2fbdc9c13849fb01f1f00" FOREIGN KEY ("subCategoriesId") REFERENCES "subCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auctions_sub_categories_sub_categories" DROP CONSTRAINT "FK_981dca2fbdc9c13849fb01f1f00"`);
        await queryRunner.query(`ALTER TABLE "auctions_sub_categories_sub_categories" DROP CONSTRAINT "FK_384e1c8fbf2d6b8109cb4ef40fd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_981dca2fbdc9c13849fb01f1f0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_384e1c8fbf2d6b8109cb4ef40f"`);
        await queryRunner.query(`DROP TABLE "auctions_sub_categories_sub_categories"`);
    }

}

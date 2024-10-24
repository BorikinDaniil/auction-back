import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1729693257614 implements MigrationInterface {
    name = 'Auto1729693257614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subCategories" DROP CONSTRAINT "FK_5fdeaec083b0032b77b7d5a201d"`);
        await queryRunner.query(`ALTER TABLE "auctions" DROP CONSTRAINT "FK_beac2d18be0914838fb34652ae2"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_9e432b7df0d182f8d292902d1a2"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_0329b247eb77b13a88d5032b05e"`);
        await queryRunner.query(`ALTER TABLE "auctions_sub_categories_sub_categories" DROP CONSTRAINT "FK_384e1c8fbf2d6b8109cb4ef40fd"`);
        await queryRunner.query(`ALTER TABLE "auctions_sub_categories_sub_categories" DROP CONSTRAINT "FK_981dca2fbdc9c13849fb01f1f00"`);
        await queryRunner.query(`ALTER TABLE "subCategories" ADD "auctionsId" integer`);
        await queryRunner.query(`ALTER TABLE "subCategories" ADD CONSTRAINT "FK_5fdeaec083b0032b77b7d5a201d" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subCategories" ADD CONSTRAINT "FK_7d37da987d9ce98f3945be728b1" FOREIGN KEY ("auctionsId") REFERENCES "auctions"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auctions" ADD CONSTRAINT "FK_beac2d18be0914838fb34652ae2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_9e432b7df0d182f8d292902d1a2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_0329b247eb77b13a88d5032b05e" FOREIGN KEY ("profileId_id") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auctions_sub_categories_sub_categories" ADD CONSTRAINT "FK_384e1c8fbf2d6b8109cb4ef40fd" FOREIGN KEY ("auctionsId") REFERENCES "auctions"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "auctions_sub_categories_sub_categories" ADD CONSTRAINT "FK_981dca2fbdc9c13849fb01f1f00" FOREIGN KEY ("subCategoriesId") REFERENCES "subCategories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auctions_sub_categories_sub_categories" DROP CONSTRAINT "FK_981dca2fbdc9c13849fb01f1f00"`);
        await queryRunner.query(`ALTER TABLE "auctions_sub_categories_sub_categories" DROP CONSTRAINT "FK_384e1c8fbf2d6b8109cb4ef40fd"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_0329b247eb77b13a88d5032b05e"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_9e432b7df0d182f8d292902d1a2"`);
        await queryRunner.query(`ALTER TABLE "auctions" DROP CONSTRAINT "FK_beac2d18be0914838fb34652ae2"`);
        await queryRunner.query(`ALTER TABLE "subCategories" DROP CONSTRAINT "FK_7d37da987d9ce98f3945be728b1"`);
        await queryRunner.query(`ALTER TABLE "subCategories" DROP CONSTRAINT "FK_5fdeaec083b0032b77b7d5a201d"`);
        await queryRunner.query(`ALTER TABLE "subCategories" DROP COLUMN "auctionsId"`);
        await queryRunner.query(`ALTER TABLE "auctions_sub_categories_sub_categories" ADD CONSTRAINT "FK_981dca2fbdc9c13849fb01f1f00" FOREIGN KEY ("subCategoriesId") REFERENCES "subCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "auctions_sub_categories_sub_categories" ADD CONSTRAINT "FK_384e1c8fbf2d6b8109cb4ef40fd" FOREIGN KEY ("auctionsId") REFERENCES "auctions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_0329b247eb77b13a88d5032b05e" FOREIGN KEY ("profileId_id") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_9e432b7df0d182f8d292902d1a2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auctions" ADD CONSTRAINT "FK_beac2d18be0914838fb34652ae2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subCategories" ADD CONSTRAINT "FK_5fdeaec083b0032b77b7d5a201d" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

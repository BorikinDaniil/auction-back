import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1730050401459 implements MigrationInterface {
    name = 'Auto1730050401459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auctions_sub_categories_sub_categories" DROP CONSTRAINT "FK_384e1c8fbf2d6b8109cb4ef40fd"`);
        await queryRunner.query(`ALTER TABLE "auctions_sub_categories_sub_categories" ADD CONSTRAINT "FK_384e1c8fbf2d6b8109cb4ef40fd" FOREIGN KEY ("auctionsId") REFERENCES "auctions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auctions_sub_categories_sub_categories" DROP CONSTRAINT "FK_384e1c8fbf2d6b8109cb4ef40fd"`);
        await queryRunner.query(`ALTER TABLE "auctions_sub_categories_sub_categories" ADD CONSTRAINT "FK_384e1c8fbf2d6b8109cb4ef40fd" FOREIGN KEY ("auctionsId") REFERENCES "auctions"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

}

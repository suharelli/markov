import { MigrationInterface, QueryRunner } from 'typeorm';

export class titles1653469923686 implements MigrationInterface {
  name = 'titles1653469923686';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "title" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_30e6ea2dcc2aae4a4d1f5d9e183" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_cb65b3a8b17aa5e02134690952" ON "title" ("title") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cb65b3a8b17aa5e02134690952"`,
    );
    await queryRunner.query(`DROP TABLE "title"`);
  }
}

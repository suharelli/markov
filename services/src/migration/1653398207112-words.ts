import { MigrationInterface, QueryRunner } from 'typeorm';

export class words1653398207112 implements MigrationInterface {
  name = 'words1653398207112';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "word" ("id" SERIAL NOT NULL, "phrase" character varying NOT NULL, "count" integer NOT NULL, CONSTRAINT "PK_ad026d65e30f80b7056ca31f666" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "next_word" ("id" SERIAL NOT NULL, "count" integer NOT NULL, "wordId" integer, "nextWordId" integer, CONSTRAINT "REL_b0808c2426669154c05c21ffcc" UNIQUE ("nextWordId"), CONSTRAINT "PK_1ca3abac2c73ff01a987e46fe10" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "next_word" ADD CONSTRAINT "FK_86664e324ccbbd2a0b732197622" FOREIGN KEY ("wordId") REFERENCES "word"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "next_word" ADD CONSTRAINT "FK_b0808c2426669154c05c21ffccd" FOREIGN KEY ("nextWordId") REFERENCES "word"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "next_word" DROP CONSTRAINT "FK_b0808c2426669154c05c21ffccd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "next_word" DROP CONSTRAINT "FK_86664e324ccbbd2a0b732197622"`,
    );
    await queryRunner.query(`DROP TABLE "next_word"`);
    await queryRunner.query(`DROP TABLE "word"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixModels1653469490812 implements MigrationInterface {
  name = 'fixModels1653469490812';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "next_word" DROP CONSTRAINT "FK_b0808c2426669154c05c21ffccd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "next_word" DROP CONSTRAINT "REL_b0808c2426669154c05c21ffcc"`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_dc02a9e53a0caaf1634cecc6ec" ON "word" ("phrase") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_86664e324ccbbd2a0b73219762" ON "next_word" ("wordId") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_254f6e8741c20016931a3b0349" ON "next_word" ("wordId", "nextWordId") `,
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
      `DROP INDEX "public"."IDX_254f6e8741c20016931a3b0349"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_86664e324ccbbd2a0b73219762"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_dc02a9e53a0caaf1634cecc6ec"`,
    );
    await queryRunner.query(
      `ALTER TABLE "next_word" ADD CONSTRAINT "REL_b0808c2426669154c05c21ffcc" UNIQUE ("nextWordId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "next_word" ADD CONSTRAINT "FK_b0808c2426669154c05c21ffccd" FOREIGN KEY ("nextWordId") REFERENCES "word"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}

import {MigrationInterface, QueryRunner} from "typeorm";

export class createTagSchema1619063727157 implements MigrationInterface {
    name = 'createTagSchema1619063727157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "notecards" ADD "tagId" uuid`);
        await queryRunner.query(`ALTER TABLE "notecards" ADD CONSTRAINT "FK_4b968f377e97246c2de82311eb3" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notecards" DROP CONSTRAINT "FK_4b968f377e97246c2de82311eb3"`);
        await queryRunner.query(`ALTER TABLE "notecards" DROP COLUMN "tagId"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}

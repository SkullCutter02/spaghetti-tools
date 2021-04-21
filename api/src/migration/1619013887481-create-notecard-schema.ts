import {MigrationInterface, QueryRunner} from "typeorm";

export class createNotecardSchema1619013887481 implements MigrationInterface {
    name = 'createNotecardSchema1619013887481'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notecards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "originalText" character varying NOT NULL, "paraphrasedText" character varying NOT NULL, "remarks" character varying, "sourceId" uuid, "projectId" uuid, CONSTRAINT "PK_d6ed51b08e040fe4f0a5d090995" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "notecards" ADD CONSTRAINT "FK_15fd7978ed6ef757cbfee4495c4" FOREIGN KEY ("sourceId") REFERENCES "sources"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notecards" ADD CONSTRAINT "FK_5db55aae9ed845ce74552d63d5f" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notecards" DROP CONSTRAINT "FK_5db55aae9ed845ce74552d63d5f"`);
        await queryRunner.query(`ALTER TABLE "notecards" DROP CONSTRAINT "FK_15fd7978ed6ef757cbfee4495c4"`);
        await queryRunner.query(`DROP TABLE "notecards"`);
    }

}

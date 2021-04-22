import {MigrationInterface, QueryRunner} from "typeorm";

export class createTagProjectRelation1619064273587 implements MigrationInterface {
    name = 'createTagProjectRelation1619064273587'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags" ADD "projectId" uuid`);
        await queryRunner.query(`ALTER TABLE "tags" ADD CONSTRAINT "FK_e37a525db372a3ba78cea0f6dd6" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags" DROP CONSTRAINT "FK_e37a525db372a3ba78cea0f6dd6"`);
        await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "projectId"`);
    }

}

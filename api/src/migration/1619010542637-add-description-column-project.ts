import {MigrationInterface, QueryRunner} from "typeorm";

export class addDescriptionColumnProject1619010542637 implements MigrationInterface {
    name = 'addDescriptionColumnProject1619010542637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" ADD "description" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "description"`);
    }

}

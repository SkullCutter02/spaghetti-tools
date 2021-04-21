import {MigrationInterface, QueryRunner} from "typeorm";

export class setCascadeProjectAndSource1619009593534 implements MigrationInterface {
    name = 'setCascadeProjectAndSource1619009593534'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sources" DROP CONSTRAINT "FK_28e5da1f30462f10b28f72fdcb7"`);
        await queryRunner.query(`ALTER TABLE "sources" ADD CONSTRAINT "FK_28e5da1f30462f10b28f72fdcb7" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sources" DROP CONSTRAINT "FK_28e5da1f30462f10b28f72fdcb7"`);
        await queryRunner.query(`ALTER TABLE "sources" ADD CONSTRAINT "FK_28e5da1f30462f10b28f72fdcb7" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

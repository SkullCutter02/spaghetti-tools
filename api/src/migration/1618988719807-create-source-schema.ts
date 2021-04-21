import {MigrationInterface, QueryRunner} from "typeorm";

export class createSourceSchema1618988719807 implements MigrationInterface {
    name = 'createSourceSchema1618988719807'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "sources_mediatype_enum" AS ENUM('Website', 'Book', 'Journal', 'Newspaper', 'Film', 'Video', 'Blog', 'Image', 'Interview', 'Lecture', 'Letter', 'Magazine', 'Music', 'Report', 'TV')`);
        await queryRunner.query(`CREATE TABLE "sources" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "url" character varying, "citation" character varying NOT NULL, "comments" jsonb NOT NULL DEFAULT '[]', "mediaType" "sources_mediatype_enum" NOT NULL, "projectId" uuid, CONSTRAINT "PK_85523beafe5a2a6b90b02096443" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sources" ADD CONSTRAINT "FK_28e5da1f30462f10b28f72fdcb7" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sources" DROP CONSTRAINT "FK_28e5da1f30462f10b28f72fdcb7"`);
        await queryRunner.query(`DROP TABLE "sources"`);
        await queryRunner.query(`DROP TYPE "sources_mediatype_enum"`);
    }

}

import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { GraphQLResolveInfo } from "graphql";

import CreateNotecardInput from "./CreateNotecardInput";
import Project from "../../entity/Project";
import Notecard from "../../entity/Notecard";
import Tag from "../../entity/Tag";
import Source from "../../entity/Source";
import relationMapper from "../../utils/relationMapper";
import UpdateNotecardInput from "./UpdateNotecardInput";

@Service()
export default class NotecardService {
  @InjectRepository(Project)
  private readonly projectRepository: Repository<Project>;

  @InjectRepository(Notecard)
  private readonly notecardRepository: Repository<Notecard>;

  @InjectRepository(Tag)
  private readonly tagRepository: Repository<Tag>;

  @InjectRepository(Source)
  private readonly sourceRepository: Repository<Source>;

  async find(notecardId: string, info: GraphQLResolveInfo) {
    const notecardRelations = relationMapper.buildRelationListForQuery(Notecard, info);
    return await this.notecardRepository.findOneOrFail(
      { id: notecardId },
      { relations: [...notecardRelations] }
    );
  }

  async findAll(projectId: string, info: GraphQLResolveInfo) {
    const project = await this.projectRepository.findOneOrFail({ id: projectId });
    const notecardRelations = relationMapper.buildRelationListForQuery(Notecard, info);
    return await this.notecardRepository.find({ where: { project }, relations: [...notecardRelations] });
  }

  async create(
    projectId: string,
    { title, originalText, paraphrasedText, remarks, tagId, sourceId }: CreateNotecardInput
  ) {
    const project = await this.projectRepository.findOneOrFail({ id: projectId });
    const tag = tagId ? await this.tagRepository.findOneOrFail({ id: tagId }) : null;
    const source = sourceId ? await this.sourceRepository.findOneOrFail({ id: sourceId }) : null;
    return await this.notecardRepository
      .create({ title, originalText, paraphrasedText, remarks, tag, project, source })
      .save();
  }

  async update(
    notecardId: string,
    { title, originalText, paraphrasedText, remarks, tagId, sourceId }: UpdateNotecardInput
  ) {
    const notecard = await this.notecardRepository.findOneOrFail({ id: notecardId });
    const tag = tagId ? await this.tagRepository.findOneOrFail({ id: tagId }) : null;
    const source = sourceId ? await this.sourceRepository.findOneOrFail({ id: sourceId }) : null;

    notecard.title = title || notecard.title;
    notecard.originalText = originalText || notecard.originalText;
    notecard.paraphrasedText = paraphrasedText || notecard.paraphrasedText;
    notecard.remarks = remarks || notecard.remarks;
    notecard.tag = tag || notecard.tag;
    notecard.source = source || notecard.source;

    await notecard.save();
    return notecard;
  }

  async delete(notecardId: string) {
    const notecard = await this.notecardRepository.findOneOrFail({ id: notecardId });
    await notecard.remove();
    return true;
  }
}

import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import { GraphQLResolveInfo } from "graphql";
import { v4 as uuid } from "uuid";

import Source from "../../entity/Source";
import CreateSourceInput from "./CreateSourceInput";
import Project from "../../entity/Project";
import relationMapper from "../../utils/relationMapper";
import UpdateSourceInput from "./UpdateSourceInput";

@Service()
export default class SourceService {
  @InjectRepository(Source)
  private readonly sourceRepository: Repository<Source>;

  @InjectRepository(Project)
  private readonly projectRepistory: Repository<Project>;

  async find(sourceId: string, info: GraphQLResolveInfo) {
    const sourceRelations = relationMapper.buildRelationListForQuery(Source, info);
    return await this.sourceRepository.findOneOrFail({ id: sourceId }, { relations: [...sourceRelations] });
  }

  async findAll(projectId: string, info: GraphQLResolveInfo) {
    const project = await this.projectRepistory.findOneOrFail({ id: projectId });
    const sourceRelations = relationMapper.buildRelationListForQuery(Source, info);
    return await this.sourceRepository.find({ where: { project }, relations: [...sourceRelations] });
  }

  async create(projectId: string, input: CreateSourceInput) {
    const project = await this.projectRepistory.findOneOrFail({ id: projectId });
    return await this.sourceRepository.create({ ...input, project }).save();
  }

  async update(sourceId: string, { url, citation, mediaType }: UpdateSourceInput) {
    const source = await this.sourceRepository.findOneOrFail({ id: sourceId });

    source.url = url || source.url;
    source.citation = citation || source.citation;
    source.mediaType = mediaType || source.mediaType;

    await source.save();
    return source;
  }

  async addComment(sourceId: string, comment: string) {
    const source = await this.sourceRepository.findOneOrFail({ id: sourceId });
    source.comments = [...source.comments, { id: uuid(), body: comment }];
    await source.save();
    return source;
  }

  async editComment(sourceId: string, commentId: string, updatedComment: string) {
    const source = await this.sourceRepository.findOneOrFail({ id: sourceId });
    source.comments = source.comments.map((source) => {
      if (source.id === commentId) return { id: source.id, body: updatedComment };
      else return source;
    });
    await source.save();
    return source;
  }

  async deleteComment(sourceId: string, commentId: string) {
    const source = await this.sourceRepository.findOneOrFail({ id: sourceId });
    source.comments = source.comments.filter((source) => source.id !== commentId);
    await source.save();
    return true;
  }
}

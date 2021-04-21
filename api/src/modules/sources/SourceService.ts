import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import { GraphQLResolveInfo } from "graphql";

import Source from "../../entity/Source";
import CreateSourceInput from "./CreateSourceInput";
import Project from "../../entity/Project";
import relationMapper from "../../utils/relationMapper";

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

  async addComment(sourceId: string, comment: string) {
    const source = await this.sourceRepository.findOneOrFail({ id: sourceId });
    source.comments = source.comments ? [...source.comments, comment] : [comment];
    await source.save();
    return source;
  }
}

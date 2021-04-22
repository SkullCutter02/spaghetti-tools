import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import { GraphQLResolveInfo } from "graphql";

import Tag from "../../entity/Tag";
import Project from "../../entity/Project";
import relationMapper from "../../utils/relationMapper";

@Service()
export default class TagService {
  @InjectRepository(Tag)
  private readonly tagRepository: Repository<Tag>;

  @InjectRepository(Project)
  private readonly projectRepository: Repository<Project>;

  async findAll(projectId: string, info: GraphQLResolveInfo) {
    const project = await this.projectRepository.findOneOrFail({ id: projectId });
    const tagRelations = relationMapper.buildRelationListForQuery(Tag, info);
    return await this.tagRepository.find({ where: { project }, relations: [...tagRelations] });
  }

  async create(projectId: string, name: string) {
    const project = await this.projectRepository.findOneOrFail({ id: projectId });
    return await this.tagRepository.create({ name, project }).save();
  }
}

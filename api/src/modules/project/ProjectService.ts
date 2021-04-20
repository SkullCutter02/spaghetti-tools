import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import { GraphQLResolveInfo } from "graphql";

import Project from "../../entity/Project";
import User from "../../entity/User";
import relationMapper from "../../utils/relationMapper";

@Service()
export default class ProjectService {
  @InjectRepository(Project)
  private readonly projectRepository: Repository<Project>;

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async find(projectId: string, info: GraphQLResolveInfo) {
    const projectRelations = relationMapper.buildRelationListForQuery(Project, info);
    return await this.projectRepository.findOneOrFail(
      { id: projectId },
      { relations: [...projectRelations] }
    );
  }

  async findAll(userId: string, info: GraphQLResolveInfo) {
    const user = await this.userRepository.findOneOrFail({ id: userId });
    const projectRelations = relationMapper.buildRelationListForQuery(Project, info);
    return await this.projectRepository.find({ where: { user }, relations: [...projectRelations] });
  }

  async create(userId: string, name: string) {
    const user = await this.userRepository.findOneOrFail({ id: userId }, { relations: ["projects"] });

    if (user.projects.some((project) => project.name === name))
      throw new Error("User already has a project with the same name");

    return await this.projectRepository.create({ name, user }).save();
  }
}

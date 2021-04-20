import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";

import Project from "../../entity/Project";
import User from "../../entity/User";

@Service()
export default class ProjectService {
  @InjectRepository(Project)
  private readonly projectRepository: Repository<Project>;

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async create(userId: string, name: string) {
    const user = await this.userRepository.findOneOrFail({ id: userId }, { relations: ["projects"] });

    if (user.projects.some((project) => project.name === name))
      throw new Error("User already has a project with the same name");

    return await this.projectRepository.create({ name, user }).save();
  }
}

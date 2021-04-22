import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";

import Tag from "../../entity/Tag";
import Project from "../../entity/Project";

@Service()
export default class TagService {
  @InjectRepository(Tag)
  private readonly tagRepository: Repository<Tag>;

  @InjectRepository(Project)
  private readonly projectRepository: Repository<Project>;

  async create(projectId: string, name: string) {
    const project = await this.projectRepository.findOneOrFail({ id: projectId });
    return await this.tagRepository.create({ name, project }).save();
  }
}

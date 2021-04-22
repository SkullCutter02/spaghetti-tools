import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import CreateNotecardInput from "./CreateNotecardInput";
import Project from "../../entity/Project";
import Notecard from "../../entity/Notecard";
import Tag from "../../entity/Tag";
import Source from "../../entity/Source";

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
}

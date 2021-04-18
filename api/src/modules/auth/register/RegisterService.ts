import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";

import User from "../entities/User";
import RegisterInput from "./RegisterInput";

@Service()
export default class RegisterService {
  @InjectRepository(User)
  userRepository: Repository<User>;

  async register(input: RegisterInput) {
    if (await this.userRepository.findOne({ email: input.email }))
      throw new Error("User with such email already exists");

    const hash = await bcrypt.hash(input.password, 12);
    return await this.userRepository.create({ email: input.email, username: input.username, hash }).save();
  }
}

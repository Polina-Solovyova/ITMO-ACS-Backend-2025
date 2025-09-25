import { userRepository } from "../repositories/user.repository";
import { User } from "../entities/User";

export class UserService {

  static async findAll(skip = 0, take = 20) {
    return await userRepository.find({ skip, take });
  }

  static async findById(id: string) {
    return await userRepository.findOneBy({ id });
  }

  static async findByEmail(email: string) {
    return await userRepository.findOneBy({ email });
  }

  static async update(id: string, data: Partial<User>) {
    const user = await userRepository.findOneBy({ id });
    if (!user) return null;
    userRepository.merge(user, data);
    return await userRepository.save(user);
  }

  static async delete(id: string) {
    return await userRepository.delete(id);
  }
}
import { propertyRepository } from "../repositories/property.repository";
import { Property } from "../entities/Property";
import { UserService } from "./user.service";

export class PropertyService {
  static async create(data: Partial<Property>) {
    if (!data.owner?.id) throw new Error("Owner ID required");
    const owner = await UserService.findById(data.owner.id);
    if (!owner) throw new Error("Owner not found");

    const entity = propertyRepository.create({
      ...data,
      owner,
    });
    return await propertyRepository.save(entity);
  }

  static async findAll(skip = 0, take = 20) {
    return await propertyRepository.find({ skip, take });
  }

  static async findById(id: string) {
    return await propertyRepository.findOneBy({ id });
  }

  static async update(id: string, data: Partial<Property>) {
    const entity = await propertyRepository.findOneBy({ id });
    if (!entity) return null;
    if (data.owner?.id) {
      const owner = await UserService.findById(data.owner.id);
      if (!owner) throw new Error("Owner not found");
      data.owner = owner;
    }
    propertyRepository.merge(entity, data);
    return await propertyRepository.save(entity);
  }

  static async delete(id: string) {
    return await propertyRepository.delete(id);
  }
}

import { propertyRepository } from "../repositories/property.repository";
import { Property } from "../entities/Property";
import { userClient } from "../clients/userClient";
import { Request } from "express";

export class PropertyService {
  static async create(data: Partial<Property>, token: string) {
    if (!data.owner_id) throw new Error("Owner ID required");

    const owner = await userClient.getUserById(data.owner_id, token);
    if (!owner) throw new Error("Owner not found");

    const entity = propertyRepository.create({
      ...data,
      owner_id: data.owner_id,
    });

    return await propertyRepository.save(entity);
  }

  static async findAll(skip = 0, take = 20) {
    return await propertyRepository.find({ skip, take });
  }

  static async findById(id: string) {
    return await propertyRepository.findOneBy({ id });
  }

  static async update(id: string, data: Partial<Property>, token: string) {
    const entity = await propertyRepository.findOneBy({ id });
    if (!entity) return null;

    if (data.owner_id) {
      const owner = await userClient.getUserById(data.owner_id, token);
      if (!owner) throw new Error("Owner not found");
      data.owner_id = owner.id;
    }

    propertyRepository.merge(entity, data);
    return await propertyRepository.save(entity);
  }

  static async delete(id: string) {
    return await propertyRepository.delete(id);
  }
}

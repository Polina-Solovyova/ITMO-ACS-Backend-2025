import { amenityRepository } from "../repositories/amenity.repository";
import { Amenity } from "../entities/Amenity";

export class AmenityService {
  static async create(data: Partial<Amenity>) {
    const entity = amenityRepository.create(data);
    return await amenityRepository.save(entity);
  }

  static async findAll(skip = 0, take = 20) {
    return await amenityRepository.find({ skip, take });
  }

  static async findById(id: string) {
    return await amenityRepository.findOneBy({ id });
  }

  static async update(id: string, data: Partial<Amenity>) {
    const entity = await amenityRepository.findOneBy({ id });
    if (!entity) return null;
    amenityRepository.merge(entity, data);
    return await amenityRepository.save(entity);
  }

  static async delete(id: string) {
    return await amenityRepository.delete(id);
  }
}

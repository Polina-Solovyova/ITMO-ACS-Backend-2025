import { propertyAmenityRepository } from "../repositories/propertyAmenity.repository";
import { PropertyAmenity } from "../entities/PropertyAmenity";
import { PropertyService } from "./property.service";
import { AmenityService } from "./amenity.service";

export class PropertyAmenityService {
  static async create(data: Partial<PropertyAmenity>) {
    if (!data.property?.id || !data.amenity?.id) throw new Error("Property and Amenity ID required");

    const property = await PropertyService.findById(data.property.id);
    const amenity = await AmenityService.findById(data.amenity.id);
    if (!property || !amenity) throw new Error("Property or Amenity not found");

    const entity = propertyAmenityRepository.create({
      ...data,
      property,
      amenity,
    });

    return await propertyAmenityRepository.save(entity);
  }

  static async findAll(skip = 0, take = 20) {
    return await propertyAmenityRepository.find({
      skip,
      take,
      relations: ["property", "amenity"],
    });
  }

  static async findById(id: string) {
    return await propertyAmenityRepository.findOne({
      where: { id },
      relations: ["property", "amenity"],
    });
  }


  static async update(id: string, data: Partial<PropertyAmenity>) {
    const entity = await propertyAmenityRepository.findOneBy({ id });
    if (!entity) return null;

    if (data.property?.id) {
      const property = await PropertyService.findById(data.property.id);
      if (!property) throw new Error("Property not found");
      data.property = property;
    }

    if (data.amenity?.id) {
      const amenity = await AmenityService.findById(data.amenity.id);
      if (!amenity) throw new Error("Amenity not found");
      data.amenity = amenity;
    }

    propertyAmenityRepository.merge(entity, data);
    return await propertyAmenityRepository.save(entity);
  }

  static async delete(id: string) {
    return await propertyAmenityRepository.delete(id);
  }
}

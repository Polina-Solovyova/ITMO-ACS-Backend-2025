import { rentalRepository } from "../repositories/rental.repository";
import { Rental } from "../entities/Rental";
import { PropertyService } from "./property.service";
import { UserService } from "./user.service";

export class RentalService {
  static async create(data: Partial<Rental>) {
    if (!data.property?.id) throw new Error("Property ID required");
    if (!data.tenant?.id) throw new Error("Tenant ID required");

    const property = await PropertyService.findById(data.property.id);
    if (!property) throw new Error("Property not found");

    const tenant = await UserService.findById(data.tenant.id);
    if (!tenant) throw new Error("Tenant not found");

    const entity = rentalRepository.create({
      ...data,
      property,
      tenant,
    });

    return await rentalRepository.save(entity);
  }

  static async findAll(skip = 0, take = 20) {
    return await rentalRepository.find({ skip, take });
  }

  static async findById(id: string) {
    return await rentalRepository.findOneBy({ id });
  }

  static async update(id: string, data: Partial<Rental>) {
    const entity = await rentalRepository.findOneBy({ id });
    if (!entity) return null;

    if (data.property?.id) {
      const property = await PropertyService.findById(data.property.id);
      if (!property) throw new Error("Property not found");
      data.property = property;
    }

    if (data.tenant?.id) {
      const tenant = await UserService.findById(data.tenant.id);
      if (!tenant) throw new Error("Tenant not found");
      data.tenant = tenant;
    }

    rentalRepository.merge(entity, data);
    return await rentalRepository.save(entity);
  }

  static async delete(id: string) {
    return await rentalRepository.delete(id);
  }
}

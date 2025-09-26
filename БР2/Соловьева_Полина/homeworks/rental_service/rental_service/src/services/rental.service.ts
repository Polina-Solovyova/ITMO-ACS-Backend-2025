import { rentalRepository } from "../repositories/rental.repository";
import { Rental } from "../entities/Rental";
import { userClient } from "../clients/userClient";
import { propertyClient } from "../clients/propertyClient";

export class RentalService {
  static async create(data: Partial<Rental>, token: string) {
    if (!data.property_id) throw new Error("Property ID required");
    if (!data.tenant_id) throw new Error("Tenant ID required");

    const property = await propertyClient.getPropertyById(data.property_id, token);
    if (!property) throw new Error("Property not found");

    const tenant = await userClient.getUserById(data.tenant_id, token);
    if (!tenant) throw new Error("Tenant not found");

    const entity = rentalRepository.create({
      ...data,
      property_id: property.id,
      tenant_id: tenant.id,
    });

    return await rentalRepository.save(entity);
  }

  static async findAll(skip = 0, take = 20) {
    return await rentalRepository.find({ skip, take });
  }

  static async findById(id: string) {
    return await rentalRepository.findOneBy({ id });
  }

  static async update(id: string, data: Partial<Rental>, token: string) {
    const entity = await rentalRepository.findOneBy({ id });
    if (!entity) return null;

    if (data.property_id) {
      const property = await propertyClient.getPropertyById(data.property_id, token);
      if (!property) throw new Error("Property not found");
      data.property_id = property.id;
    }

    if (data.tenant_id) {
      const tenant = await userClient.getUserById(data.tenant_id, token);
      if (!tenant) throw new Error("Tenant not found");
      data.tenant_id = tenant.id;
    }

    rentalRepository.merge(entity, data);
    return await rentalRepository.save(entity);
  }

  static async delete(id: string) {
    return await rentalRepository.delete(id);
  }
}

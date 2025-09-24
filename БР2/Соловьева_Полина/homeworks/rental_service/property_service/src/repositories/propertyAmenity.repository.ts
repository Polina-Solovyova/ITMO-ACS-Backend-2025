import { AppDataSource } from "../config/data-source";
import { PropertyAmenity } from "../entities/PropertyAmenity";

export const propertyAmenityRepository = AppDataSource.getRepository(PropertyAmenity);

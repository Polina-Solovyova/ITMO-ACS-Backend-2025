import { AppDataSource } from "../config/data-source";
import { Amenity } from "../entities/Amenity";

export const amenityRepository = AppDataSource.getRepository(Amenity);

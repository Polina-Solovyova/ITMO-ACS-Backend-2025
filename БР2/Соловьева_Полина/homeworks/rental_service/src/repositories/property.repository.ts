import { AppDataSource } from "../config/data-source";
import { Property } from "../entities/Property";

export const propertyRepository = AppDataSource.getRepository(Property);

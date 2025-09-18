import { AppDataSource } from "../config/data-source";
import { Rental } from "../entities/Rental";

export const rentalRepository = AppDataSource.getRepository(Rental);

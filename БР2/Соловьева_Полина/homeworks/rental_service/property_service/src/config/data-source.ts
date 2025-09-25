import "reflect-metadata";
import { DataSource } from "typeorm";
import { Property } from "../entities/Property";
import { Amenity } from "../entities/Amenity";
import { PropertyAmenity } from "../entities/PropertyAmenity";

const databaseUrl = process.env.DATABASE_URL || "postgres://user:password@localhost:5432/properties";

export const AppDataSource = new DataSource({
    type: "postgres",
    url: databaseUrl,
    synchronize: true,
    logging: false,
    entities: [Property, Amenity, PropertyAmenity]
});
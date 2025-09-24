import "reflect-metadata";
import { DataSource } from "typeorm";
import { Property } from "../entities/Property";
import { Amenity } from "../entities/Amenity";
import { PropertyAmenity } from "../entities/PropertyAmenity";


export const AppDataSource = new DataSource({
type: "sqlite",
database: "./db.sqlite",
synchronize: true,
logging: false,
entities: [Property, Amenity, PropertyAmenity]
});
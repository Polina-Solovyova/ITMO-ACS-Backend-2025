import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Property } from "../entities/Property";
import { Amenity } from "../entities/Amenity";
import { PropertyAmenity } from "../entities/PropertyAmenity";
import { Rental } from "../entities/Rental";
import { Message } from "../entities/Message";
import { Review } from "../entities/Review";


export const AppDataSource = new DataSource({
type: "sqlite",
database: "./db.sqlite",
synchronize: true,
logging: false,
entities: [User, Property, Amenity, PropertyAmenity, Rental, Message, Review]
});
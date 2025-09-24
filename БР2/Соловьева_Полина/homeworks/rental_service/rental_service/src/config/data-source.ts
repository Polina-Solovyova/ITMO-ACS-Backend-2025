import "reflect-metadata";
import { DataSource } from "typeorm";
import { Rental } from "../entities/Rental";
import { Message } from "../entities/Message";
import { Review } from "../entities/Review";


export const AppDataSource = new DataSource({
type: "sqlite",
database: "./db.sqlite",
synchronize: true,
logging: false,
entities: [Rental, Message, Review]
});
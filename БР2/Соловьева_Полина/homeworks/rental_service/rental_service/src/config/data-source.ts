import "reflect-metadata";
import { DataSource } from "typeorm";
import { Rental } from "../entities/Rental";
import { Message } from "../entities/Message";
import { Review } from "../entities/Review";

const databaseUrl = process.env.DATABASE_URL || "postgres://user:password@localhost:5432/rental";

export const AppDataSource = new DataSource({
    type: "postgres",
    url: databaseUrl,
    synchronize: true,
    logging: false,
    entities: [Rental, Message, Review]
});


import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";

const databaseUrl = process.env.DATABASE_URL || "postgres://user:password@localhost:5432/users";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: databaseUrl,
  synchronize: true,
  logging: false,
  entities: [User],
});

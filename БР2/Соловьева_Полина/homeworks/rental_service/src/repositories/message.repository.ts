import { AppDataSource } from "../config/data-source";
import { Message } from "../entities/Message";

export const messageRepository = AppDataSource.getRepository(Message);

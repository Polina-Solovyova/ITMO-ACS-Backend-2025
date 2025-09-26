import { messageRepository } from "../repositories/message.repository";
import { Message } from "../entities/Message";
import { userClient } from "../clients/userClient";
import { RentalService } from "./rental.service";

export class MessageService {
  static async create(data: Partial<Message>, token: string) {
    if (!data.sender_id || !data.receiver_id) throw new Error("Sender and Receiver ID required");

    const sender = await userClient.getUserById(data.sender_id, token);
    const receiver = await userClient.getUserById(data.receiver_id, token);
    if (!sender || !receiver) throw new Error("Sender or Receiver not found");

    let rental_id: string | null = null;
    if (data.rental_id) {
      const rental = await RentalService.findById(data.rental_id);
      if (!rental) throw new Error("Rental not found");
      rental_id = rental.id;
    }

    // @ts-ignore
    const entity = messageRepository.create({
      ...data,
      sender_id: sender.id,
      receiver_id: receiver.id,
      rental_id,
    });

    return await messageRepository.save(entity);
  }

  static async findAll(skip = 0, take = 20) {
    return await messageRepository.find({ skip, take });
  }

  static async findById(id: string) {
    return await messageRepository.findOneBy({ id });
  }

  static async update(id: string, data: Partial<Message>, token: string) {
    const entity = await messageRepository.findOneBy({ id });
    if (!entity) return null;

    if (data.sender_id) {
      const sender = await userClient.getUserById(data.sender_id, token);
      if (!sender) throw new Error("Sender not found");
      data.sender_id = sender.id;
    }

    if (data.receiver_id) {
      const receiver = await userClient.getUserById(data.receiver_id, token);
      if (!receiver) throw new Error("Receiver not found");
      data.receiver_id = receiver.id;
    }

    if (data.rental_id) {
      const rental = await RentalService.findById(data.rental_id);
      if (!rental) throw new Error("Rental not found");
      data.rental_id = rental.id;
    }

    messageRepository.merge(entity, data);
    return await messageRepository.save(entity);
  }

  static async delete(id: string) {
    return await messageRepository.delete(id);
  }
}

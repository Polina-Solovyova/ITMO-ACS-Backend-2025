import { messageRepository } from "../repositories/message.repository";
import { Message } from "../entities/Message";
import { UserService } from "./user.service";
import { RentalService } from "./rental.service";

export class MessageService {
  static async create(data: Partial<Message>) {
    if (!data.sender?.id || !data.receiver?.id) throw new Error("Sender and Receiver ID required");

    const sender = await UserService.findById(data.sender.id);
    const receiver = await UserService.findById(data.receiver.id);
    if (!sender || !receiver) throw new Error("Sender or Receiver not found");

    let rental = null;
    if (data.rental?.id) {
      rental = await RentalService.findById(data.rental.id);
      if (!rental) throw new Error("Rental not found");
    }

    // @ts-ignore
    const entity = messageRepository.create({
      ...data,
      sender,
      receiver,
      rental,
    });

    return await messageRepository.save(entity);
  }

  static async findAll(skip = 0, take = 20) {
    return await messageRepository.find({ skip, take });
  }

  static async findById(id: string) {
    return await messageRepository.findOneBy({ id });
  }

  static async update(id: string, data: Partial<Message>) {
    const entity = await messageRepository.findOneBy({ id });
    if (!entity) return null;

    if (data.sender?.id) {
      const sender = await UserService.findById(data.sender.id);
      if (!sender) throw new Error("Sender not found");
      data.sender = sender;
    }

    if (data.receiver?.id) {
      const receiver = await UserService.findById(data.receiver.id);
      if (!receiver) throw new Error("Receiver not found");
      data.receiver = receiver;
    }

    if (data.rental?.id) {
      const rental = await RentalService.findById(data.rental.id);
      if (!rental) throw new Error("Rental not found");
      data.rental = rental;
    }

    messageRepository.merge(entity, data);
    return await messageRepository.save(entity);
  }

  static async delete(id: string) {
    return await messageRepository.delete(id);
  }
}

import { Request, Response } from "express";
import { MessageService } from "../services/message.service";

export class MessageController {
  static async create(req: Request, res: Response) {
    try {
      const { senderId, receiverId, rentalId, ...rest } = req.body;

      const saved = await MessageService.create({
        ...rest,
        sender_id: senderId,
        receiver_id: receiverId,
        rental_id: rentalId || undefined,
      });

      res.status(201).json(saved);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const { skip = 0, take = 20 } = req.query as any;
      const messages = await MessageService.findAll(Number(skip), Number(take));
      res.json(messages);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const message = await MessageService.findById(req.params.id);
      if (!message) return res.status(404).json({ message: "Message not found" });
      res.json(message);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { senderId, receiverId, rentalId, ...rest } = req.body;

      const updated = await MessageService.update(req.params.id, {
        ...rest,
        sender_id: senderId,
        receiver_id: receiverId,
        rental_id: rentalId,
      });

      if (!updated) return res.status(404).json({ message: "Message not found" });
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const result = await MessageService.delete(req.params.id);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}

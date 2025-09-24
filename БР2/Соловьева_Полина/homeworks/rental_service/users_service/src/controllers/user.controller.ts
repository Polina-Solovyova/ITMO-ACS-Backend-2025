import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  static async create(req: Request, res: Response) {
    try {
      const saved = await UserService.create(req.body);
      res.status(201).json(saved);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const { skip = 0, take = 20, email } = req.query as any;

      if (email) {
        // API-эндпоинт для поиска по email
        const user = await UserService.findByEmail(email);
        return res.json(user);
      }

      const users = await UserService.findAll(Number(skip), Number(take));
      res.json(users);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const user = await UserService.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const updated = await UserService.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: "User not found" });
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const result = await UserService.delete(req.params.id);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}

import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { AuthRequest } from "../middleware/authMiddleware";

export class UserController {

  static async findAll(req: AuthRequest, res: Response) {
    try {
      const { skip = 0, take = 20, email } = req.query as any;

      if (email) {
        const user = await UserService.findByEmail(email);
        if (!user) return res.status(404).json({ message: "User not found" });

        const { password, ...userResponse } = user;
        return res.json(userResponse);
      }

      const users = await UserService.findAll(Number(skip), Number(take));

      const usersResponse = users.map(u => {
        const { password, ...userResponse } = u;
        return userResponse;
      });

      res.json(usersResponse);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async findById(req: AuthRequest, res: Response) {
    try {
      const user = await UserService.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });

      const { password, ...userResponse } = user;
      res.json(userResponse);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req: AuthRequest, res: Response) {
    try {
      if (req.user?.id !== req.params.id) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const updated = await UserService.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: "User not found" });

      const { password, ...userResponse } = updated;
      res.json(userResponse);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req: AuthRequest, res: Response) {
    try {
      if (req.user?.id !== req.params.id) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const result = await UserService.delete(req.params.id);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}

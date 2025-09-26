import { Response } from "express";
import { PropertyService } from "../services/property.service";
import { AuthRequest } from "../middleware/authMiddleware";

export class PropertyController {
  static async create(req: AuthRequest, res: Response) {
    try {
      const saved = await PropertyService.create({
        ...req.body,
        owner_id: req.user!.id, // берём из токена
      });
      res.status(201).json(saved);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async findAll(req: AuthRequest, res: Response) {
    try {
      const { skip = 0, take = 20 } = req.query as any;
      const properties = await PropertyService.findAll(Number(skip), Number(take));
      res.json(properties);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async findById(req: AuthRequest, res: Response) {
    try {
      const property = await PropertyService.findById(req.params.id);
      if (!property) return res.status(404).json({ message: "Property not found" });
      res.json(property);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req: AuthRequest, res: Response) {
    try {
      const updated = await PropertyService.update(req.params.id, {
        ...req.body,
        owner_id: req.user!.id,
      });
      if (!updated) return res.status(404).json({ message: "Property not found" });
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req: AuthRequest, res: Response) {
    try {
      const result = await PropertyService.delete(req.params.id);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}

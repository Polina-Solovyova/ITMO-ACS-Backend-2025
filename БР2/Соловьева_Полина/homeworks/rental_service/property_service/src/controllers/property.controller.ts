import { Request, Response } from "express";
import { PropertyService } from "../services/property.service";

export class PropertyController {
  static async create(req: Request, res: Response) {
    try {
      const { ownerId, ...rest } = req.body;

      const saved = await PropertyService.create({
        ...rest,
        owner_id: ownerId,
      });

      res.status(201).json(saved);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const { skip = 0, take = 20 } = req.query as any;
      const properties = await PropertyService.findAll(Number(skip), Number(take));
      res.json(properties);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const property = await PropertyService.findById(req.params.id);
      if (!property) return res.status(404).json({ message: "Property not found" });
      res.json(property);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { ownerId, ...rest } = req.body;

      const updated = await PropertyService.update(req.params.id, {
        ...rest,
        owner_id: ownerId,
      });

      if (!updated) return res.status(404).json({ message: "Property not found" });
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const result = await PropertyService.delete(req.params.id);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}

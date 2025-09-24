import { Request, Response } from "express";
import { AmenityService } from "../services/amenity.service";

export class AmenityController {
  static async create(req: Request, res: Response) {
    try {
      const saved = await AmenityService.create(req.body);
      res.status(201).json(saved);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const { skip = 0, take = 20 } = req.query as any;
      const amenities = await AmenityService.findAll(Number(skip), Number(take));
      res.json(amenities);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const amenity = await AmenityService.findById(req.params.id);
      if (!amenity) return res.status(404).json({ message: "Amenity not found" });
      res.json(amenity);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const updated = await AmenityService.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: "Amenity not found" });
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const result = await AmenityService.delete(req.params.id);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}

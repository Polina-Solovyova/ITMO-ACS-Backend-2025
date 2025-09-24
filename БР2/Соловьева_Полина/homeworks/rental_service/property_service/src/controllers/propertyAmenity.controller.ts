import { Request, Response } from "express";
import { PropertyAmenityService } from "../services/propertyAmenity.service";

export class PropertyAmenityController {
  static async create(req: Request, res: Response) {
    try {
      const { propertyId, amenityId, ...rest } = req.body;

      const saved = await PropertyAmenityService.create({
        ...rest,
        property: { id: propertyId },
        amenity: { id: amenityId },
      });

      res.status(201).json(saved);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const { skip = 0, take = 20 } = req.query as any;
      const items = await PropertyAmenityService.findAll(Number(skip), Number(take));
      res.json(items);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const item = await PropertyAmenityService.findById(req.params.id);
      if (!item) return res.status(404).json({ message: "Item not found" });
      res.json(item);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { propertyId, amenityId, ...rest } = req.body;

      const updated = await PropertyAmenityService.update(req.params.id, {
        ...rest,
        property: propertyId ? { id: propertyId } : undefined,
        amenity: amenityId ? { id: amenityId } : undefined,
      });

      if (!updated) return res.status(404).json({ message: "Item not found" });
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const result = await PropertyAmenityService.delete(req.params.id);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}

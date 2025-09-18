import { Request, Response } from "express";
import { RentalService } from "../services/rental.service";

export class RentalController {
  static async create(req: Request, res: Response) {
    try {
      const { propertyId, tenantId, ...rest } = req.body;

      const saved = await RentalService.create({
        ...rest,
        property: { id: propertyId },
        tenant: { id: tenantId },
      });

      res.status(201).json(saved);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const { skip = 0, take = 20 } = req.query as any;
      const rentals = await RentalService.findAll(Number(skip), Number(take));
      res.json(rentals);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const rental = await RentalService.findById(req.params.id);
      if (!rental) return res.status(404).json({ message: "Rental not found" });
      res.json(rental);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { propertyId, tenantId, ...rest } = req.body;

      const updated = await RentalService.update(req.params.id, {
        ...rest,
        property: propertyId ? { id: propertyId } : undefined,
        tenant: tenantId ? { id: tenantId } : undefined,
      });

      if (!updated) return res.status(404).json({ message: "Rental not found" });
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const result = await RentalService.delete(req.params.id);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}

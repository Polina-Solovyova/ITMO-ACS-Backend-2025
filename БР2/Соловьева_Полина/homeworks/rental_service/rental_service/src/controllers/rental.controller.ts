import { Request, Response } from "express";
import { RentalService } from "../services/rental.service";
import { publishToQueue } from "../config/rabbit";

export class RentalController {
  static async create(req: Request, res: Response) {
    try {
      const { propertyId, tenantId, ...rest } = req.body;

      const saved = await RentalService.create({
        ...rest,
        property_id: propertyId,
        tenant_id: tenantId,
      });

      if (saved.status === "accepted") {
        await publishToQueue("rental_events", {
          type: "rental_created",
          payload: {
            id: saved.id,
            propertyId,
            renterId: tenantId,
            startDate: saved.start_date,
            endDate: saved.end_date,
          },
        });
      }

      res.status(201).json(saved);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { propertyId, tenantId, ...rest } = req.body;

      const updated = await RentalService.update(req.params.id, {
        ...rest,
        property_id: propertyId,
        tenant_id: tenantId,
      });

      if (!updated) return res.status(404).json({ message: "Rental not found" });

      if (updated.status === "accepted") {
        await publishToQueue("rental_events", {
          type: "rental_created",
          payload: {
            id: updated.id,
            propertyId,
            renterId: tenantId,
            startDate: updated.start_date,
            endDate: updated.end_date,
          },
        });
      }

      if (updated.status === "cancelled") {
        await publishToQueue("rental_events", {
          type: "rental_cancelled",
          payload: {
            rentalId: updated.id,
            propertyId,
            renterId: tenantId,
          },
        });
      }

      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const rental = await RentalService.findById(req.params.id);
      const result = await RentalService.delete(req.params.id);

      if (rental) {
        await publishToQueue("rental_events", {
          type: "rental_cancelled",
          payload: {
            rentalId: rental.id,
            propertyId: rental.property_id,
            renterId: rental.tenant_id,
          },
        });
      }

      res.json(result);
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

}

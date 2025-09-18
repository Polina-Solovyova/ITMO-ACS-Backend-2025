import { Request, Response } from "express";
import { ReviewService } from "../services/review.service";

export class ReviewController {
  static async create(req: Request, res: Response) {
    try {
      const { rentalId, reviewerId, ...rest } = req.body;

      const saved = await ReviewService.create({
        ...rest,
        rental: { id: rentalId },
        reviewer: { id: reviewerId },
      });

      res.status(201).json(saved);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const { skip = 0, take = 20 } = req.query as any;
      const reviews = await ReviewService.findAll(Number(skip), Number(take));
      res.json(reviews);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const review = await ReviewService.findById(req.params.id);
      if (!review) return res.status(404).json({ message: "Review not found" });
      res.json(review);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { rentalId, ...rest } = req.body;

      const updated = await ReviewService.update(req.params.id, {
        ...rest,
        rental: rentalId ? { id: rentalId } : undefined,
      });

      if (!updated) return res.status(404).json({ message: "Review not found" });
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const result = await ReviewService.delete(req.params.id);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}

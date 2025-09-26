// ReviewController.ts
import { Request, Response } from "express";
import { ReviewService } from "../services/review.service";
import { AuthRequest } from "../middleware/authMiddleware";

export class ReviewController {
  static async create(req: AuthRequest, res: Response) {
    try {
      const { rentalId, ...rest } = req.body;
      const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

      const saved = await ReviewService.create(
        {
          ...rest,
          rental_id: rentalId,
          reviewer_id: req.user!.id,
        },
        token!
      );

      res.status(201).json(saved);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req: AuthRequest, res: Response) {
    try {
      const { rentalId, ...rest } = req.body;
      const token = req.headers.authorization?.split(" ")[1];

      const updated = await ReviewService.update(
        req.params.id,
        {
          ...rest,
          rental_id: rentalId,
          reviewer_id: req.user!.id,
        },
        token!
      );

      if (!updated) return res.status(404).json({ message: "Review not found" });
      res.json(updated);
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

  static async delete(req: Request, res: Response) {
    try {
      const result = await ReviewService.delete(req.params.id);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}

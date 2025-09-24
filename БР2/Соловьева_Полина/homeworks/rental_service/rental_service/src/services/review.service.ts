import { reviewRepository } from "../repositories/review.repository";
import { Review } from "../entities/Review";
import { RentalService } from "./rental.service";
import { userClient } from "../clients/userClient";

export class ReviewService {
  static async create(data: Partial<Review>) {
    if (!data.rental_id || !data.reviewer_id) throw new Error("Rental and Reviewer ID required");

    const rental = await RentalService.findById(data.rental_id);
    if (!rental) throw new Error("Rental not found");

    const reviewer = await userClient.getUserById(data.reviewer_id);
    if (!reviewer) throw new Error("Reviewer not found");

    const entity = reviewRepository.create({
      ...data,
      rental_id: rental.id,
      reviewer_id: reviewer.id,
    });

    return await reviewRepository.save(entity);
  }

  static async findAll(skip = 0, take = 20) {
    return await reviewRepository.find({ skip, take });
  }

  static async findById(id: string) {
    return await reviewRepository.findOneBy({ id });
  }

  static async update(id: string, data: Partial<Review>) {
    const entity = await reviewRepository.findOneBy({ id });
    if (!entity) return null;

    if (data.rental_id) {
      const rental = await RentalService.findById(data.rental_id);
      if (!rental) throw new Error("Rental not found");
      data.rental_id = rental.id;
    }

    if (data.reviewer_id) {
      const reviewer = await userClient.getUserById(data.reviewer_id);
      if (!reviewer) throw new Error("Reviewer not found");
      data.reviewer_id = reviewer.id;
    }

    reviewRepository.merge(entity, data);
    return await reviewRepository.save(entity);
  }

  static async delete(id: string) {
    return await reviewRepository.delete(id);
  }
}

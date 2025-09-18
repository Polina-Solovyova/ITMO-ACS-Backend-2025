import { reviewRepository } from "../repositories/review.repository";
import { Review } from "../entities/Review";
import { RentalService } from "./rental.service";
import { UserService } from "./user.service";

export class ReviewService {
  static async create(data: Partial<Review>) {
    if (!data.rental?.id || !data.reviewer?.id) throw new Error("Rental and Reviewer ID required");

    const rental = await RentalService.findById(data.rental.id);
    const reviewer = await UserService.findById(data.reviewer.id);
    if (!rental || !reviewer) throw new Error("Rental or Reviewer not found");

    const entity = reviewRepository.create({
      ...data,
      rental,
      reviewer,
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

    if (data.rental?.id) {
      const rental = await RentalService.findById(data.rental.id);
      if (!rental) throw new Error("Rental not found");
      data.rental = rental;
    }

    if (data.reviewer?.id) {
      const reviewer = await UserService.findById(data.reviewer.id);
      if (!reviewer) throw new Error("Reviewer not found");
      data.reviewer = reviewer;
    }

    reviewRepository.merge(entity, data);
    return await reviewRepository.save(entity);
  }

  static async delete(id: string) {
    return await reviewRepository.delete(id);
  }
}

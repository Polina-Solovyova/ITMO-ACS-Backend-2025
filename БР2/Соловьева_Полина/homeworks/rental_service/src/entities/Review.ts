import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Rental } from "./Rental";
import { User } from "./User";


@Entity()
export class Review {
@PrimaryGeneratedColumn("uuid")
id: string;


@ManyToOne(() => Rental, (rental) => rental.reviews)
rental: Rental;


@ManyToOne(() => User, (user) => user.reviews)
reviewer: User;


@Column("int")
rating: number;


@Column("text")
comment: string;


@Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
created_at: Date;
}
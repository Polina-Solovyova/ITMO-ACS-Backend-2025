import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Property } from "./Property";
import { Review } from "./Review";


@Entity()
export class Rental {
@PrimaryGeneratedColumn("uuid")
id: string;


@ManyToOne(() => Property, (property) => property.rentals)
property: Property;


@ManyToOne(() => User, (user) => user.rentals)
tenant: User;


@Column({ type: "date" })
start_date: Date;


@Column({ type: "date" })
end_date: Date;


@Column()
status: string;


@Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
created_at: Date;


@OneToMany(() => Review, (review) => review.rental)
reviews: Review[];
}
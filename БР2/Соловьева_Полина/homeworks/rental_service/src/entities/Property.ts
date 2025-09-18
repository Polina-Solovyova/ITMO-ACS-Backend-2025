import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Rental } from "./Rental";
import { PropertyAmenity } from "./PropertyAmenity";


@Entity()
export class Property {
@PrimaryGeneratedColumn("uuid")
id: string;


@ManyToOne(() => User, (user) => user.properties)
owner: User;


@Column()
title: string;


@Column("text")
description: string;


@Column()
type: string;


@Column()
location: string;


@Column("decimal")
price_per_month: number;


@Column("simple-array")
photos: string[];


@Column({ type: "date" })
available_from: Date;


@Column({ type: "date" })
available_to: Date;


@Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
created_at: Date;


@Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
updated_at: Date;


@OneToMany(() => PropertyAmenity, (pa) => pa.property)
amenities: PropertyAmenity[];


@OneToMany(() => Rental, (rental) => rental.property)
rentals: Rental[];
}
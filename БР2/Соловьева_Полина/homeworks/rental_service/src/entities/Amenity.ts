import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { PropertyAmenity } from "./PropertyAmenity";


@Entity()
export class Amenity {
@PrimaryGeneratedColumn("uuid")
id: string;


@Column()
name: string;


@Column({ nullable: true })
description: string;


@OneToMany(() => PropertyAmenity, (pa) => pa.amenity)
propertyAmenities: PropertyAmenity[];
}
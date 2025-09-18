import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Property } from "./Property";
import { Amenity } from "./Amenity";


@Entity()
export class PropertyAmenity {
@PrimaryGeneratedColumn("uuid")
id: string;


@ManyToOne(() => Property, (property) => property.amenities)
property: Property;


@ManyToOne(() => Amenity, (amenity) => amenity.propertyAmenities)
amenity: Amenity;
}
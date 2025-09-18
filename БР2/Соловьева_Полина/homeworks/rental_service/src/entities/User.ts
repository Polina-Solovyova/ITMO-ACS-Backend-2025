import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Property } from "./Property";
import { Rental } from "./Rental";
import { Message } from "./Message";
import { Review } from "./Review";


export type UserRole = 'owner' | 'tenant' | 'admin';


@Entity()
export class User {
@PrimaryGeneratedColumn("uuid")
id!: string;


@Column()
first_name!: string;


@Column()
last_name!: string;


@Column({ unique: true })
email!: string;


@Column({ nullable: true })
phone_number?: string;


@Column()
password_hash!: string;


@Column({ type: "text", default: "tenant" })
role!: UserRole;


@CreateDateColumn()
created_at!: Date;


@UpdateDateColumn()
updated_at!: Date;


@OneToMany(() => Property, (p) => p.owner)
properties!: Property[];


@OneToMany(() => Rental, (r) => r.tenant)
rentals!: Rental[];


@OneToMany(() => Message, (m) => m.sender)
sent_messages!: Message[];


@OneToMany(() => Message, (m) => m.receiver)
received_messages!: Message[];


@OneToMany(() => Review, (rev) => rev.reviewer)
reviews!: Review[];
}
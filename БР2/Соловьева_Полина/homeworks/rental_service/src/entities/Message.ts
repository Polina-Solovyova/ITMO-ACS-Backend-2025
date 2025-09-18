import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Rental } from "./Rental";


@Entity()
export class Message {
@PrimaryGeneratedColumn("uuid")
id: string;


@ManyToOne(() => User, (user) => user.sent_messages)
sender: User;


@ManyToOne(() => User, (user) => user.received_messages)
receiver: User;


@ManyToOne(() => Rental, (rental) => rental.id)
rental: Rental;


@Column("text")
content: string;


@Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
timestamp: Date;
}
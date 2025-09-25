import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Message {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  sender_id: string;

  @Column()
  receiver_id: string;

  @Column({ nullable: true })
  rental_id?: string;

  @Column("text")
  content: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  timestamp: Date;
}

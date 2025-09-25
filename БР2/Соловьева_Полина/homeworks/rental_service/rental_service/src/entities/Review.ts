import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Review {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  rental_id: string;

  @Column()
  reviewer_id: string;

  @Column("int")
  rating: number;

  @Column("text")
  comment: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
}

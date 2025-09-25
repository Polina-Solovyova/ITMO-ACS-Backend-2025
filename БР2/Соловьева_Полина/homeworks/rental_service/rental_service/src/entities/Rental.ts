import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Rental {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  property_id: string;

  @Column()
  tenant_id: string;

  @Column({ type: "date" })
  start_date: Date;

  @Column({ type: "date" })
  end_date: Date;

  @Column()
  status: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
}

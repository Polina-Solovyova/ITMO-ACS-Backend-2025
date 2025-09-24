import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

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
  password!: string;

  @Column({ type: "text", default: "tenant" })
  role!: UserRole;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

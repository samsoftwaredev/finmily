import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { SuspiciousType } from "../utils";

@Entity("suspicious_activity")
class SuspiciousActivityModel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    // TODO: foreignKey
    type: "uuid",
    nullable: false,
  })
  reported_by: string;

  @Column({
    // TODO: foreignKey
    type: "uuid",
    nullable: false,
  })
  user_id_reported: string;

  @Column({
    type: "text",
    nullable: false,
  })
  //  description on why the user is a scammer
  reason: string;

  @Column({
    type: "boolean",
    nullable: true,
  })
  is_resolved: boolean;

  @Column({
    type: "text",
    nullable: true,
  })
  // how was the problem resolved
  solution: string;

  @Column({
    type: "enum",
    enum: SuspiciousType,
    nullable: false,
  })
  event_type: SuspiciousType;

  @CreateDateColumn() // when the activity was created
  created_at: Date;

  @DeleteDateColumn() // when the activity was resolved
  deleted_at: Date;

  @UpdateDateColumn() // when the user last updated their profile
  updated_at: Date;
}

export default SuspiciousActivityModel;

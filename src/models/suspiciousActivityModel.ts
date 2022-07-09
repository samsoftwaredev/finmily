import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from "typeorm";

export enum EventType {
  LOOKS_LIKE_A_SCAMMER = "Looks like a scammer",
  ASK_FOR_PHONE_NUMBER_OR_EMAIL = "Ask for phone number or email",
  SEND_THEIR_PHONE_NUMBER_OR_EMAIL = "Send their phone number or email",
  ASK_FOR_ANOTHER_PAYMENT_METHOD = "Ask for another payment method",
  RUDE_OR_INAPPROPRIATE = "Rude or inappropriate",
  REQUESTED_MONEY = "Requested Money",
  SENT_MONEY = "Send money",
  NONE_OF_THE_ABOVE = "None of the above",
}

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
    enum: EventType,
    nullable: false,
  })
  event_type: EventType;

  @CreateDateColumn() // when the activity was created
  created_at: Date;

  @DeleteDateColumn() // when the activity was resolved
  deleted_at: Date;

  @UpdateDateColumn() // when the user last updated their profile
  updated_at: Date;
}

export default SuspiciousActivityModel;

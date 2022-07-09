import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

export enum EventType {
  MESSAGES = "messages",
  HOUSEHOLD_EVENT = "household_event",
  LEDGER = "ledger",
}

@Entity("household_history")
class HouseholdHistoryModel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "uuid",
    nullable: false,
  })
  household_id: string;

  @Column({
    type: "uuid",
    nullable: false,
  })
  household_event_id: string;

  @Column({
    type: "enum",
    enum: EventType,
    nullable: false,
  })
  event_type: EventType;

  @Column({
    type: "boolean",
    nullable: false,
    default: false,
  })
  // Hide some events from household history.
  // These events helps sys admins understand usability, but not users.
  is_hidden: boolean;
}

export default HouseholdHistoryModel;

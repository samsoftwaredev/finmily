import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from "typeorm";
import HouseholdEventModel from "./householdEventModel";
import HouseholdModel from "./householdModel";

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

  @OneToMany(()=> HouseholdEventModel, householdEvent => householdEvent.householdHistory)
  householdEvent: HouseholdEventModel[]

  @OneToOne(() => HouseholdModel, (household) => household.householdHistory)
  @JoinColumn({ name: "household_id" })
  household: HouseholdModel;
}

export default HouseholdHistoryModel;

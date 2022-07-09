import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { HouseholdHistoryType } from "../utils";
import HouseholdEventModel from "./householdEventModel";
import HouseholdModel from "./householdModel";


@Entity("household_history")
class HouseholdHistoryModel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "enum",
    enum: HouseholdHistoryType,
    nullable: false,
  })
  event_type: HouseholdHistoryType;

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

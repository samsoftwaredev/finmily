import {
  Entity,
  BaseEntity,
  Column,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import HouseholdHistoryModel from "./householdHistoryModel";
import HouseholdModel from "./householdModel";

export enum EventType {
  HOUSEHOLD_CREATED = "household_created",
  HOUSEHOLD_NAME_UPDATED = "household_name_updated",
  HOUSEHOLD_DELETED = "household_deleted",
  DESCRIPTION_UPDATED = "description_updated",
  PICTURE_UPDATED = "picture_updated",
  USER_REMOVED = "user_removed",
  USER_INVITED = "user_invited",
  USER_JOINED = "user_joined",
  USER_LEFT = "user_left",
  ADMIN_ADDED = "admin_added",
  ADMIN_REMOVED = "admin_removed",
  ADMIN_LEFT = "admin_left",
  VIEWED_USER_ACCOUNT = "viewed_user_account",
}

@Entity("household_event")
class HouseholdEventModel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "enum",
    enum: EventType,
    nullable: false,
  })
  event_type: EventType;

  @Column({
    type: "text",
    nullable: true,
  })
  description: string;

  @UpdateDateColumn() // last time user permission were updated
  updated_at: Date;

  @DeleteDateColumn() // last time user permission were updated
  created_at: Date;

  @CreateDateColumn() // last time user permission were updated
  deleted_at: Date;

  @ManyToOne(() => HouseholdHistoryModel, (householdHistory) => householdHistory.householdEvent)
  @JoinColumn({ name: "household_history_id" })
  householdHistory: HouseholdHistoryModel;

  @ManyToOne(() => HouseholdModel, (household) => household.householdEvent)
  @JoinColumn({ name: "household_id" })
  household: HouseholdModel;
}

export default HouseholdEventModel;

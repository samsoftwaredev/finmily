import {
  Entity,
  BaseEntity,
  Column,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import HouseholdModel from "./householdModel";
import UserModel from "./userModel";

@Entity("user_household_visibility")
class UserHouseholdVisibilityModel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "boolean",
    nullable: true,
  })
  show_transactions: boolean;

  @Column({
    type: "boolean",
    nullable: false,
  })
  show_bank_balance: boolean;

  @Column({
    type: "boolean",
    nullable: false,
  })
  show_monthly_expenses: boolean;

  @Column({
    type: "boolean",
    nullable: false,
  })
  show_monthly_revenue: boolean;

  @UpdateDateColumn() // last time user permission were updated
  updated_at: Date;

  @ManyToOne(() => UserModel, (user) => user.userHouseholdVisibility)
  @JoinColumn({ name: "user_id" })
  user: UserModel;

  @ManyToOne(() => HouseholdModel, (household) => household.userHouseholdVisibility)
  @JoinColumn({ name: "household_id" })
  household: HouseholdModel;
}

export default UserHouseholdVisibilityModel;

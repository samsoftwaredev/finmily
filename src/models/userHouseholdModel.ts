import {
    Entity,
    BaseEntity,
    Column,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn,
  } from "typeorm";
import { ColorScheme } from "../utils";
import HouseholdModel from "./householdModel";
import UserModel from "./userModel";


  @Entity("user_household")
  class UserHouseholdModel extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
      type: "boolean",
      default: false, 
    })
    is_admin: boolean;
  
    @Column({
      type: "date",
      default: new Date().toISOString()
    })
    looked_at: Date;
  
    @Column({
      type: "enum",
      enum: ColorScheme,
      default: ColorScheme.WHITE,
    })
    color: ColorScheme;

    @ManyToOne(()=>UserModel, user => user.userHousehold)
    @JoinColumn({ name: "user_id" })
    user: UserModel
  
    @ManyToOne(()=>HouseholdModel, household => household.userHousehold)
    @JoinColumn({ name: "household_id" })
    household: HouseholdModel
  }
  
  export default UserHouseholdModel;
  
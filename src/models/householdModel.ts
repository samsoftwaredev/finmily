import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import UserHouseholdModel from "./userHouseholdModel";
import UserHouseholdVisibilityModel from "./userHouseholdVisibilityModel";
import UserModel from "./userModel";

@Entity("household")
class HouseholdModel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    // one to one
    // TODO: foreignKey
    nullable: false,
    type: "uuid",
  })
  history_id: string;

  @Column({
    type: "text",
    nullable: false,
    width: 64,
  })
  name: string;

  @Column({
    type: "text",
    nullable: true,
    width: 250,
  })
  description: string;

  @Column({
    type: "text",
    nullable: true,
    width: 500,
  })
  picture: string;

  @Column({
    type: "date",
    nullable: true,
  }) // if the household was blocked for suspicious activity
  blocked_at: Date;

  @Column({
    type: "date",
    nullable: true,
  }) // if the household was deactivated because of inactivity
  deactivated_at: Date;

  @Column({
    nullable: false,
    type: "simple-array",
  })
  // an array that stores a list of users uuid that belong to the household
  household_users: string[];

  @CreateDateColumn() // when the household was created
  created_at: Date;

  @DeleteDateColumn() // when the household was deleted
  deleted_at: Date;

  @UpdateDateColumn() // when the household was last updated
  updated_at: Date;

  @ManyToOne(() => UserModel, (user) => user.household)
  @JoinColumn({ name: "created_by" })
  user: UserModel;

  @OneToMany(()=>UserHouseholdModel, userHousehold => userHousehold.household)
  userHousehold: UserHouseholdModel[]

  @OneToMany(()=>UserHouseholdVisibilityModel, userHouseholdVisibilityModel => userHouseholdVisibilityModel.household)
  userHouseholdVisibility: UserHouseholdVisibilityModel[]
}

export default HouseholdModel;
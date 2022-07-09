import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from "typeorm";
import { constants } from "../utils";
import AddressModel from "./addressModel";
import HouseholdModel from "./householdModel";
import InvitationModel from "./invitationModel";
import UserHouseholdModel from "./userHouseholdModel";
import UserHouseholdVisibilityModel from "./userHouseholdVisibilityModel";

export enum UserRole {
  SYS_ADMIN = "sys_admin",
  ADMIN = "admin",
  USER = "user",
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
}
@Entity("user")
class UserModel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "text",
    unique: true,
    width: constants.MAX_EMAIL_LENGTH,
  })
  email: string;

  @Column({
    type: "text",
    nullable: false,
    width: constants.MAX_USER_NAME_LENGTH,
  })
  first_name: string;

  @Column({
    type: "text",
    nullable: false,
    width: constants.MAX_USER_NAME_LENGTH,
  })
  last_name: string;

  @Column({
    type: "text",
    nullable: true,
    width: constants.MAX_USER_NAME_LENGTH,
  })
  middle_name: string;

  @Column({
    type: "enum",
    enum: Gender,
    nullable: true,
  })
  gender: Gender;

  @Column({
    type: "date",
    nullable: true,
  })
  dob: Date;

  @CreateDateColumn() // when the user join the app
  created_at: Date;

  @DeleteDateColumn() // if the user was deleted from db
  deleted_at: Date;

  @UpdateDateColumn() // when the user last updated their profile
  updated_at: Date;

  @Column({
    type: "date",
    nullable: true,
  }) // if the user was blocked for suspicious activity
  blocked_at: Date;

  @Column({
    type: "date",
    nullable: true,
  }) // if the user was deactivated because of inactivity
  deactivated_at: Date;

  @Column({
    type: "date",
    nullable: false,
    default: new Date().toISOString(),
  })
  last_login: Date;

  @Column({
    type: "uuid",
    nullable: true,
  }) // track if the user joined the app bc an invite sent by another user
  invitation_id: string;

  @Column({
    type: "boolean",
    default: false,
  })
  is_online: boolean;

  @Column({
    type: "text",
    nullable: true,
  })
  phone_number: string;

  @Column({
    type: "text",
    nullable: true,
  })
  country_code: string;

  @Column({
    type: "boolean",
    default: false,
  })
  is_email_verified: boolean;

  @Column({
    type: "boolean",
    default: false,
  })
  is_phone_verified: boolean;

  @Column({
    type: "boolean",
    default: false,
  })
  is_2fa_enabled: boolean;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(() => UserHouseholdModel, (userHousehold) => userHousehold.user)
  userHousehold: UserHouseholdModel[];

  @OneToMany(
    () => UserHouseholdVisibilityModel,
    (userHouseholdVisibility) => userHouseholdVisibility.user
  )
  userHouseholdVisibility: UserHouseholdVisibilityModel[];

  @OneToMany(() => HouseholdModel, (household) => household.user)
  household: HouseholdModel[];

  @OneToMany(() => InvitationModel, (invitation) => invitation.user)
  invitation: InvitationModel[];

  @OneToMany(() => AddressModel, (address) => address.user)
  address: AddressModel[];

  // @Column()
  //   @Generated("uuid")
  // bank_account_id: string;

  // @Column()
  // remember_me: string;
}

export default UserModel;

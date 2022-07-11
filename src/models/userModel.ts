import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { constants, GenderType, UserRoleType } from "../utils";
import AddressModel from "./addressModel";
import HouseholdModel from "./householdModel";
import InvitationModel from "./invitationModel";
import SuspiciousActivityModel from "./suspiciousActivityModel";
import UserHouseholdModel from "./userHouseholdModel";
import UserHouseholdVisibilityModel from "./userHouseholdVisibilityModel";


@Entity("user")
class UserModel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "text",
    unique: true,
    width: constants.MAX_EMAIL_LENGTH,
    nullable: false
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
    enum: GenderType,
    nullable: true,
  })
  gender: GenderType;

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
    enum: UserRoleType,
    default: UserRoleType.USER,
  })
  role: UserRoleType;

  @OneToMany(() => UserHouseholdModel, (userHousehold) => userHousehold.user)
  userHousehold: UserHouseholdModel[];

  @OneToMany(
    () => UserHouseholdVisibilityModel,
    (userHouseholdVisibility) => userHouseholdVisibility.user
  )
  userHouseholdVisibility: UserHouseholdVisibilityModel[];

  @OneToMany(() => HouseholdModel, (household) => household.user)
  household: HouseholdModel[];

  @OneToMany(() => InvitationModel, (invitation) => invitation.invited_by)
  invited_by: InvitationModel[];

  @OneToMany(() => AddressModel, (address) => address.user)
  address: AddressModel[];

  @OneToOne(() => InvitationModel, (invitation) => invitation.user_id_invited)
  user_id_invited: UserModel;

  @OneToMany(() => SuspiciousActivityModel, (suspiciousActivity) => suspiciousActivity.reported_by)
  reported_by: SuspiciousActivityModel[];

  @OneToMany(() => SuspiciousActivityModel, (suspiciousActivity) => suspiciousActivity.user_id_reported)
  user_id_reported: SuspiciousActivityModel[];

  // @Column()
  // @Generated("uuid")
  // bank_account_id: string;

  // @Column()
  // remember_me: string;
}

export default UserModel;

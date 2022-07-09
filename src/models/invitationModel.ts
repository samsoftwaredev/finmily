import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { constants } from "../utils";
import UserModel from "./userModel";

export enum InvitedReason {
  HOUSEHOLD = "joinHousehold",
}

@Entity("invitation")
class InvitationModel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    // one to one
    // TODO: foreignKey
    nullable: true,
    type: "uuid",
  })
  user_id_invited: string;

  @Column({
    type: "text",
    nullable: false,
    width: constants.MAX_USER_FULL_NAME_LENGTH,
  })
  user_name_invited: string;

  @Column({
    type: "text",
    nullable: false,
    width: constants.MAX_EMAIL_LENGTH,
  })
  user_email_invited: string;

  @CreateDateColumn() // when the user join the app
  created_at: Date;

  @UpdateDateColumn() // when the user last updated their profile
  updated_at: Date;

  @Column({
    type: "date",
    nullable: true,
  }) // if the invitation was blocked for suspicious activity
  blocked_at: Date;

  @Column({
    type: "date",
    nullable: true,
  }) // if the household was expired because of inactivity
  expired_at: Date;

  @Column({
    type: "enum",
    enum: InvitedReason,
    default: InvitedReason.HOUSEHOLD,
    nullable: false,
  })
  invited_to: InvitedReason;

  @Column({ type: "simple-json", nullable: true })
  data: { household_id?: string };

  @ManyToOne(() => UserModel, (user) => user.invitation)
  @JoinColumn({ name: "invited_by" })
  user: UserModel;
}

export default InvitationModel;
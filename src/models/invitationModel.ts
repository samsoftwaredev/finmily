import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { validation, InvitedReasonType } from '../utils';
import UserModel from './userModel';

@Entity('invitation')
class InvitationModel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: false,
    width: validation.MAX_USER_FULL_NAME_LENGTH,
  })
  user_name_invited: string;

  @Column({
    type: 'text',
    nullable: false,
    width: validation.MAX_EMAIL_LENGTH,
  })
  user_email_invited: string;

  @CreateDateColumn() // when the user join the app
  created_at: Date;

  @UpdateDateColumn() // when the user last updated their profile
  updated_at: Date;

  @Column({
    type: 'date',
    nullable: true,
  }) // if the invitation was blocked for suspicious activity
  blocked_at: Date;

  @Column({
    type: 'date',
    nullable: true,
  }) // if the household was expired because of inactivity
  expired_at: Date;

  @Column({
    type: 'enum',
    enum: InvitedReasonType,
    default: InvitedReasonType.HOUSEHOLD,
    nullable: false,
  })
  invited_to: InvitedReasonType;

  @Column({ type: 'simple-json', nullable: true })
  data: { household_id?: string };

  @ManyToOne(() => UserModel, (user) => user.invited_by)
  @JoinColumn({ name: 'invited_by_id' })
  invited_by: UserModel;

  @OneToOne(() => UserModel, (user) => user.user_id_invited)
  @JoinColumn({ name: 'user_id_invited' })
  user_id_invited: UserModel;
}

export default InvitationModel;

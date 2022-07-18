import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SuspiciousEnum } from '../utils';
import UserModel from './userModel';

@Entity('suspicious_activity')
class SuspiciousActivityModel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  //  description on why the user is a scammer
  reason: string;

  @Column({
    type: 'boolean',
    nullable: true,
  })
  is_resolved: boolean;

  @Column({
    type: 'text',
    nullable: true,
  })
  // how was the problem resolved
  solution: string;

  @Column({
    type: 'enum',
    enum: SuspiciousEnum,
    nullable: false,
  })
  event_type: SuspiciousEnum;

  @CreateDateColumn() // when the activity was created
  created_at: Date;

  @DeleteDateColumn() // when the activity was resolved
  deleted_at: Date;

  @UpdateDateColumn() // when the user last updated their profile
  updated_at: Date;

  @ManyToOne(() => UserModel, (user) => user.reported_by, {
    cascade: true,
  })
  @JoinColumn({ name: 'reported_by', referencedColumnName: 'id' })
  reported_by: UserModel;

  @ManyToOne(() => UserModel, (user) => user.user_id_reported, {
    cascade: true,
  })
  @JoinColumn({ name: 'user_id_reported', referencedColumnName: 'id' })
  user_id_reported: UserModel;
}

export default SuspiciousActivityModel;

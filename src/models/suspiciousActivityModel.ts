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
import { SuspiciousType } from '../utils';
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
    enum: SuspiciousType,
    nullable: false,
  })
  event_type: SuspiciousType;

  @CreateDateColumn() // when the activity was created
  created_at: Date;

  @DeleteDateColumn() // when the activity was resolved
  deleted_at: Date;

  @UpdateDateColumn() // when the user last updated their profile
  updated_at: Date;

  @ManyToOne(() => UserModel, (user) => user.reported_by)
  @JoinColumn({ name: 'reported_by' })
  reported_by: UserModel;

  @ManyToOne(() => UserModel, (user) => user.user_id_reported)
  @JoinColumn({ name: 'user_id_reported' })
  user_id_reported: UserModel;
}

export default SuspiciousActivityModel;

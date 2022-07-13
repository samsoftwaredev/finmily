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
} from 'typeorm';
import { HouseholdEventType } from '../utils';
import HouseholdHistoryModel from './householdHistoryModel';
import HouseholdModel from './householdModel';

@Entity('household_event')
class HouseholdEventModel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: HouseholdEventType,
    nullable: false,
  })
  event_type: HouseholdEventType;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  created_at: Date;

  @CreateDateColumn()
  deleted_at: Date;

  @ManyToOne(
    () => HouseholdHistoryModel,
    (householdHistory) => householdHistory.householdEvent,
  )
  @JoinColumn({ name: 'household_history_id' })
  householdHistory: HouseholdHistoryModel;

  @ManyToOne(() => HouseholdModel, (household) => household.householdEvent)
  @JoinColumn({ name: 'household_id' })
  household: HouseholdModel;
}

export default HouseholdEventModel;

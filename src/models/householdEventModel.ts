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
import { HouseholdEventEnum } from '../utils';
import HouseholdHistoryModel from './householdHistoryModel';
import HouseholdModel from './householdModel';

@Entity('household_event')
class HouseholdEventModel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: HouseholdEventEnum,
    nullable: false,
  })
  event_type: HouseholdEventEnum;

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
    (householdHistory) => householdHistory.household_history,
  )
  @JoinColumn({ name: 'household_history_id' })
  household_history: HouseholdHistoryModel;

  @ManyToOne(() => HouseholdModel, (household) => household.household_event)
  @JoinColumn({ name: 'household_id' })
  household: HouseholdModel;
}

export default HouseholdEventModel;

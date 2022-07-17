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
  OneToOne,
} from 'typeorm';
import { householdProps } from '../utils';
import HouseholdEventModel from './householdEventModel';
import HouseholdHistoryModel from './householdHistoryModel';
import UserHouseholdModel from './userHouseholdModel';
import UserHouseholdVisibilityModel from './userHouseholdVisibilityModel';
import UserModel from './userModel';

@Entity('household')
class HouseholdModel extends BaseEntity implements householdProps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: false,
    width: 64,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
    width: 250,
  })
  description: string;

  @Column({
    type: 'text',
    nullable: true,
    width: 500,
  })
  picture: string;

  @Column({
    type: 'date',
    nullable: true,
  }) // if the household was blocked for suspicious activity
  blocked_at: Date;

  @Column({
    type: 'date',
    nullable: true,
  }) // if the household was deactivated because of inactivity
  deactivated_at: Date;

  @CreateDateColumn() // when the household was created
  created_at: Date;

  @DeleteDateColumn() // when the household was deleted
  deleted_at: Date;

  @UpdateDateColumn() // when the household was last updated
  updated_at: Date;

  @ManyToOne(() => UserModel, (user) => user.household)
  // TODO: this must be a require field
  @JoinColumn({ name: 'created_by' })
  user: UserModel;

  @OneToMany(
    () => UserHouseholdModel,
    (userHousehold) => userHousehold.household,
  )
  userHousehold: UserHouseholdModel[];

  @OneToMany(
    () => UserHouseholdVisibilityModel,
    (userHouseholdVisibility) => userHouseholdVisibility.household,
  )
  userHouseholdVisibility: UserHouseholdVisibilityModel[];

  @OneToMany(
    () => HouseholdEventModel,
    (householdEvent) => householdEvent.household,
  )
  householdEvent: HouseholdEventModel[];

  @OneToOne(
    () => HouseholdHistoryModel,
    (householdHistory) => householdHistory.household,
  )
  @JoinColumn({ name: 'history_id' })
  householdHistory: HouseholdHistoryModel;
}

export default HouseholdModel;

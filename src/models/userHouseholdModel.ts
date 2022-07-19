import {
  Entity,
  BaseEntity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { userHouseholdProps } from '../utils/interfaces/userHouseholdInterfaces';
import { ColorSchemeEnum } from '../utils';
import HouseholdModel from './householdModel';
import UserModel from './userModel';

@Entity('user_household')
class UserHouseholdModel extends BaseEntity implements userHouseholdProps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  is_admin: boolean;

  @Column({
    type: 'date',
    default: new Date().toISOString(),
  })
  looked_at: Date;

  @Column({
    type: 'enum',
    enum: ColorSchemeEnum,
    default: ColorSchemeEnum.WHITE,
  })
  color: ColorSchemeEnum;

  @ManyToOne(() => UserModel, (user) => user.user_household)
  @JoinColumn({ name: 'user_id' })
  user: UserModel; // this is what is cause the problem with the "$ref": "#/definitions/default_2"
  // basically the library doesn't know how to resolve ManyToMay, OneToMany and One to One relationship

  @ManyToOne(() => HouseholdModel, (household) => household.user_household)
  @JoinColumn({ name: 'household_id' })
  household: HouseholdModel;
}

export default UserHouseholdModel;

import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { constants } from "../utils";
import UserModel from "./userModel";

@Entity("address")
class AddressModel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "text",
    nullable: false,
    width: constants.MAX_STREET_ADDRESS_LENGTH,
  })
  street_address_1: string;

  @Column({
    type: "text",
    nullable: true,
    width: constants.MAX_STREET_ADDRESS_LENGTH,
  })
  street_address_2: string;

  @Column({
    type: "text",
    nullable: false,
    width: constants.MAX_CITY_LENGTH,
  })
  city: string;

  @Column({
    type: "text",
    nullable: false,
    width: constants.MAX_STATE_LENGTH,
  })
  state: string;

  @Column({
    type: "text",
    nullable: false,
    width: constants.MAX_POSTAL_CODE_LENGTH,
  })
  postal_code: string;

  @Column({
    type: "text",
    nullable: false,
    width: constants.MAX_COUNTRY_LENGTH,
  })
  country: string;

  @CreateDateColumn() // when the user entered the address
  created_at: Date;

  @DeleteDateColumn() // if the user deleted the address
  deleted_at: Date;

  @ManyToOne(() => UserModel, (user) => user.address)
  @JoinColumn({ name: "user_id" })
  user: UserModel;
}

export default AddressModel;

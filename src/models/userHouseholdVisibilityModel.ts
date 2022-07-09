import {
    Entity,
    BaseEntity,
    Column,
  UpdateDateColumn,
  PrimaryColumn,
  } from "typeorm";
  
  @Entity("user_household_visibility")
  class UserHouseholdVisibilityModel extends BaseEntity {
    @PrimaryColumn({
      // TODO: foreignKey
      type: "uuid",
      nullable: false,
    })
    user_id: string;
  
    @PrimaryColumn({
      // TODO: foreignKey
      type: "uuid",
      nullable: false,
    })
    household_id: string;
  
    @Column({
      type: "boolean",
      nullable: true,
    })
    show_transactions: boolean;
  
    @Column({
      type: "boolean",
      nullable: false,
    })
    show_bank_balance: boolean;
  
    @Column({
      type: "boolean",
      nullable: false,
    })
    show_monthly_expenses: boolean;
  
    @Column({
      type: "boolean",
      nullable: false,
    })
    show_monthly_revenue: boolean;
  
    @UpdateDateColumn() // last time user permission were updated
    updated_at: Date;
  }
  
  export default UserHouseholdVisibilityModel;
  
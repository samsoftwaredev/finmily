import {
    Entity,
    BaseEntity,
    Column,
    ManyToOne,
    PrimaryColumn,
  } from "typeorm";

  export enum ColorScheme {
    WHITE = "white",
    RED = "red",
    GREEN = "green",
    PURPLE = "purple",
    ORANGE = "orange",
    BLUE = "blue",
    YELLOW = "yellow",
  }
  
  @Entity("user_household")
  class UserHouseholdModel extends BaseEntity {
    @PrimaryColumn({
      // TODO: foreignKey
      type: "uuid",
      nullable: false,
    })
    user_id: string;
    
    // @ManyToOne(()=>)
    @PrimaryColumn({
      // TODO: foreignKey
      type: "uuid",
      nullable: false,
    })
    household_id: string;
  
    @Column({
      type: "boolean",
      default: false, 
    })
    is_admin: boolean;
  
    @Column({
      type: "date",
      default: new Date().toISOString()
    })
    looked_at: Date;
  
    @Column({
      type: "enum",
      enum: ColorScheme,
      default: ColorScheme.WHITE,
    })
    color: ColorScheme;
  
  }
  
  export default UserHouseholdModel;
  
import { Entity, BaseEntity, Column } from "typeorm";

@Entity('users')
class UsersModel extends BaseEntity {
    @Column()
    first_name: string;
    @Column()
    last_name: string;
    @Column({
        unique: true
    })
    email: string;
}

export default UsersModel
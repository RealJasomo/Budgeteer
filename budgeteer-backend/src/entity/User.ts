import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ObjectIdColumn, OneToOne, JoinColumn, getRepository } from "typeorm";
import { Profile } from "./Profile";

@Entity("users")
export class User extends BaseEntity{
    @ObjectIdColumn()
    _id: string;

    @PrimaryGeneratedColumn()
    id: string;

    @Column("text")
    email: string;
    
    @Column("text")
    password: string;

    @Column(type=>Profile)
    profile: Profile;

}

import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ObjectIdColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity("profiles")
export class Profile extends BaseEntity{
    @ObjectIdColumn()
    _id: string;
    
    @PrimaryGeneratedColumn()
    id: string;

    @Column("text")
    firstName: string;
    
    @Column("text")
    lastName: string;
    
    @Column("text")
    dateOfBirth: string;
}
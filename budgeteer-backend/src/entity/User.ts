import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ObjectIdColumn } from "typeorm";

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

}
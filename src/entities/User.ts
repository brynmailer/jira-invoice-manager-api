import { ObjectType, Field, ID, Int } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { Invoice } from "./Invoice";

@ObjectType()
@Entity()
export class User {
  @Field((type) => ID)
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Field()
  @Column({
    type: "varchar",
    length: 255,
  })
  firstName: string;

  @Field()
  @Column({
    type: "varchar",
    length: 255,
  })
  lastName: string;

  @Column({
    type: "char",
    length: 60,
  })
  password: string;

  @Field((type) => String, { nullable: true })
  @Column({
    type: "varchar",
    length: 60,
    nullable: true,
  })
  refreshToken: string;

  @Field()
  @Column({
    type: "varchar",
    length: 255,
    unique: true,
  })
  email: string;

  @Field()
  @Column({
    type: "varchar",
    length: 255,
  })
  role: string;

  @Field((type) => Int)
  @Column({ type: "int", default: 0 })
  createdInvoices: number;

  @Field((type) => [Invoice], { nullable: true })
  @OneToMany((type) => Invoice, (invoice) => invoice.user)
  invoices: Invoice[];
}

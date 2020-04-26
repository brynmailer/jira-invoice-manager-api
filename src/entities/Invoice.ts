import { ObjectType, Field, ID, Int, Float } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";

import { User } from "./User";
import { InvoiceItem } from "./InvoiceItem";

@ObjectType()
@Entity()
export class Invoice {
  
  @Field(type => ID)
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Field(type => Int)
  @Column("int")
  number: number;

  @Field()
  @Column("varchar")
  issued: string;

  @Field()
  @Column({
    type: "varchar",
    length: 255
  })
  status: string;

  @Field()
  @Column({
    type: "varchar",
    length: 255
  })
  businessName: string;

  @Field()
  @Column({
    type: "varchar",
    length: 255
  })
  billTo: string;

  @Field(type => Float)
  @Column("float")
  ratePerHour: number;

  @Field(type => Float)
  @Column("float")
  total: number;

  @Field()
  @Column("varchar")
  due: string;

  @ManyToOne(type => User, user => user.invoices, { nullable: false })
  user: User;

  @Field(type => [InvoiceItem])
  @OneToMany(type => InvoiceItem, item => item.invoice, { cascade: true, onDelete: "CASCADE" })
  items: InvoiceItem[];

}

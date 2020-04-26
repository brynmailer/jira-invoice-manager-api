import { ObjectType, Field, ID, Int } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { Invoice } from "./Invoice";

@ObjectType()
@Entity()
export class InvoiceItem {
  
  @Field(type => ID)
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Field()
  @Column({
    type: "varchar",
    length: 40
  })
  jiraId: string;

  @Field()
  @Column({
    type: "varchar",
    length: 40
  })
  issueId: string;

  @ManyToOne(type => Invoice, invoice => invoice.items)
  invoice: Invoice;

}

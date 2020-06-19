import { ObjectType, Field, ID, Int } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { Invoice } from "./Invoice";

@ObjectType()
@Entity()
export class InvoiceItem {
  @Field((type) => ID)
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Field()
  @Column()
  cloudId: string;

  @Field()
  @Column()
  worklogId: string;

  @Field()
  @Column()
  issueKey: string;

  @ManyToOne((type) => Invoice, (invoice) => invoice.items, {
    onDelete: "CASCADE",
  })
  invoice: Invoice;
}

import { ObjectType, Field, ID, Int } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity()
export class Log {
  @Field((type) => ID)
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Field()
  @Column({
    type: "varchar",
    length: 255,
  })
  ip: string;

  @Field()
  @Column({
    type: "varchar",
    length: 255,
  })
  userAgent: string;

  @Field()
  @Column("varchar")
  timestamp: string;

  @Field()
  @Column({
    type: "varchar",
    length: 255,
  })
  action: string;
}
